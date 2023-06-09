// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, {
	FunctionComponent,
	useState,
	useContext,
	useEffect,
} from "react";
import UserIdContext from "@contexts/UserIdContext";
import { Link as RouterLink } from "react-router-dom";

import {
	Avatar,
	Box,
	Container,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import PfpPicker from "./PfpPicker/PfpPicker";
import { toast } from "react-toastify";
import { auth, db, playersRef } from "@config/firebase";
import { signInAnonymously } from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlayerDoc from "@Types/PlayerDoc";
import {
	addDoc,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface ChooseUsernameProps {
	roomId: string;
}

const ChooseUsername: FunctionComponent<ChooseUsernameProps> = ({ roomId }) => {
	const [userIdContext, setUserIdContext] = useContext(UserIdContext);
	const [currentPfp, setCurrentPfp] = useState<string | undefined>();
	const [sending, setSending] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (userIdContext.playerDocId) {
			setSending(false);

			navigate("/" + roomId + "/room");
		}
	}, [userIdContext, roomId, navigate]);

	const updateOthersPlayerInstances = async (newPlayer: PlayerDoc) => {
		const q = query(playersRef, where("uid", "==", newPlayer.uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((playerDoc) => {
			const playerTyped = playerDoc.data() as PlayerDoc;
			deleteDoc(doc(db, "players", playerTyped.playerDocId));
		});
	};

	const createPlayer = async (newPlayer: PlayerDoc) => {
		await updateOthersPlayerInstances(newPlayer).then(() => {
			addDoc(playersRef, newPlayer).then((res) => {
				const playerDocId = res.id;
				updateDoc(doc(db, "players", playerDocId), {
					playerDocId: playerDocId,
				}).then(() => {
					setUserIdContext({
						uid: res.id,
						playerDocId: playerDocId,
					});
				});
			});
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const username = data.get("username") as string;
		if (!username) {
			toast.error("Invalid username");
			return;
		}
		if (!currentPfp) {
			toast.error("Invalid profile picture!");
			return;
		}
		setSending(true);

		try {
			signInAnonymously(auth).then((res) => {
				const uid = res.user.uid;
				const newPlayer: PlayerDoc = {
					roomId: roomId,
					cards: [],
					pfp: currentPfp,
					playerDocId: "",
					uid: uid,
					username: username,
				};
				createPlayer(newPlayer);
			});
		} catch (err) {
			toast.error("Something went wrong");
			console.error(err);
		} finally {
		}
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					my: 8,
				}}
			>
				<Paper
					elevation={1}
					sx={{
						px: 3,
						py: 3,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<AccountCircleIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Pick a username
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
						/>
						<Typography gutterBottom>
							Choose a Profile Picture<sup>*</sup>
						</Typography>
						<PfpPicker
							currentPfp={currentPfp}
							setCurrentPfp={setCurrentPfp}
						/>
						<LoadingButton
							type="submit"
							fullWidth
							loading={sending}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Next
						</LoadingButton>
						<Grid container>
							<Grid item xs>
								<Link component={RouterLink} to="/">
									Return Home
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default ChooseUsername;

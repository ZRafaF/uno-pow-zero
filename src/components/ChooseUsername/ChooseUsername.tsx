// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, { FunctionComponent, useState } from "react";

import {
	Avatar,
	Box,
	Container,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import PfpPicker from "./PfpPicker/PfpPicker";
import { toast } from "react-toastify";
import { auth, playersRef } from "@config/firebase";
import { signInAnonymously } from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import playerDoc from "@Types/PlayerDoc";
import { addDoc, getDocs, query, where } from "firebase/firestore";

interface ChooseUsernameProps {
	roomId: string;
}

const ChooseUsername: FunctionComponent<ChooseUsernameProps> = ({ roomId }) => {
	const [currentPfp, setCurrentPfp] = useState<string | undefined>();
	const [sending, setSending] = useState<boolean>(false);

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
		signInAnonymously(auth)
			.then((res) => {
				const uid = res.user.uid;
				const newPlayer: playerDoc = {
					roomId: roomId,
					cards: [],
					pfp: currentPfp,
					uid: uid,
					username: username,
				};
				addDoc(playersRef, newPlayer)
					.then((res) => {
						const q = query(playersRef, where("uid", "==", uid));
						getDocs(q).then((querySnapshot) => {
							querySnapshot.forEach((doc) => {
								// doc.data() is never undefined for query doc snapshots
								console.log(doc.id, " => ", doc.data());
							});
						});
					})
					.catch((err) => {
						toast.error("Something went wrong");
						console.error(err);
					});
				console.log(newPlayer);
			})

			.catch((err) => {
				toast.error("Something went wrong");
				console.error(err);
			})
			.finally(() => {
				setSending(false);
			});
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
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
					</Avatar>{" "}
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
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default ChooseUsername;

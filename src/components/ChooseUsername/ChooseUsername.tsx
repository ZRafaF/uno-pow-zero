// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, { FunctionComponent, useState, useContext } from "react";

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
import { db } from "@config/firebase";
import { LoadingButton } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Player } from "@Types/DocTypes";
import { doc, updateDoc } from "firebase/firestore";
import { DocsContext } from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";

interface ChooseUsernameProps {
	roomId: string;
}

const ChooseUsername: FunctionComponent<ChooseUsernameProps> = ({ roomId }) => {
	const [userIdContext] = useContext(UserIdContext);
	const [docsContext] = useContext(DocsContext);
	const [currentPfp, setCurrentPfp] = useState<string | undefined>();
	const [sending, setSending] = useState<boolean>(false);

	const createPlayer = async (newPlayer: Player) => {
		let newPlayersArray = [...docsContext.room.doc.players];
		newPlayersArray.push(newPlayer);
		updateDoc(doc(db, "rooms", docsContext.room.doc.roomId), {
			players: newPlayersArray,
		})
			.then(() => {
				setSending(true);
			})
			.catch((err) => {
				console.error(err);
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
		if (docsContext.room.loading) {
			toast.error("Something went wrong!");
			return;
		}
		setSending(true);

		try {
			const uid = userIdContext;
			const newPlayer: Player = {
				roomId: roomId,
				cards: [],
				pfp: currentPfp,
				uid: uid,
				username: username,
			};
			createPlayer(newPlayer);
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
					mb: 2,
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
					</Box>
				</Paper>
			</Box>
		</Container>
	);
};

export default ChooseUsername;

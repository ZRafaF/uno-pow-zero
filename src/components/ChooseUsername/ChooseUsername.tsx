// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, { FunctionComponent, useState, useContext } from "react";
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
import { auth, db } from "@config/firebase";
import { signInAnonymously } from "firebase/auth";
import { LoadingButton } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Player } from "@Types/DocTypes";
import { addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { DocsContext } from "@contexts/DocsContext";

interface ChooseUsernameProps {
	roomId: string;
}

const ChooseUsername: FunctionComponent<ChooseUsernameProps> = ({ roomId }) => {
	const [docsContext] = useContext(DocsContext);
	const [currentPfp, setCurrentPfp] = useState<string | undefined>();
	const [sending, setSending] = useState<boolean>(false);

	const createPlayer = async (newPlayer: Player) => {};

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

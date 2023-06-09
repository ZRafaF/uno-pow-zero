// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChangeEvent, FunctionComponent, useState } from "react";

import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FindRoomProps {}

const FindRoom: FunctionComponent<FindRoomProps> = () => {
	const [validUsername, setValidUsername] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const roomKey = data.get("roomKey");

		if (!roomKey) {
			toast.error("Invalid room key!");
			return;
		}
		navigate("/" + roomKey + "/room");
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const textValue = event.target.value;
		if (textValue.length) {
			setValidUsername(true);
		} else {
			setValidUsername(false);
		}
	};

	return (
		<Grid item component="form" noValidate onSubmit={handleSubmit}>
			<Card variant="elevation" elevation={4}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Find a room
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Enter in a existing room. Insert the room key bellow!
					</Typography>
				</CardContent>
				<CardActions>
					<Grid
						spacing={2}
						container
						direction="row"
						justifyContent="space-around"
						alignItems="center"
					>
						<Grid item>
							<TextField
								required
								id="roomKey"
								label="Room Key"
								name="roomKey"
								autoComplete="username"
								onChange={handleChange}
								error={!validUsername}
							/>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								endIcon={<SearchIcon />}
								type="submit"
								disabled={!validUsername}
							>
								Find
							</Button>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default FindRoom;

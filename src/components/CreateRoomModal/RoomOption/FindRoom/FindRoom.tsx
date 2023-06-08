// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

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
interface FindRoomProps {}

const FindRoom: FunctionComponent<FindRoomProps> = () => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			roomKey: data.get("roomKey"),
		});
	};

	return (
		<Grid item component="form" noValidate onSubmit={handleSubmit}>
			<Card variant="outlined">
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
								autoFocus
							/>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								endIcon={<SearchIcon />}
								type="submit"
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

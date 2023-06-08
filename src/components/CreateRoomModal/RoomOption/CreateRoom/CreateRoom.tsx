// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { auth, roomsRef } from "@config/firebase";
import { signInAnonymously } from "firebase/auth";
import RoomDoc from "@Types/RoomDoc";
import { addDoc } from "firebase/firestore";
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";

interface CreateRoomProps {}

const CreateRoom: FunctionComponent<CreateRoomProps> = () => {
	const [createLoading, setCreateloading] = useState<boolean>(false);
	const navigate = useNavigate();

	const createRoom = async () => {
		setCreateloading(true);
		signInAnonymously(auth)
			.then((userSign) => {
				const newRoom: RoomDoc = {
					creatorUid: userSign.user.uid,
					currentCard: { color: "black", type: "wild" },
					currentPlayerUid: "",
					currentDirection: "cw",
					playersUid: [],
					roomId: "",
				};
				addDoc(roomsRef, newRoom)
					.then((res) => {
						const roomId = res.id;
						console.log(res.id);
						navigate("/room/" + roomId);
					})
					.catch((err) => {
						toast.error("Something went wrong");
						console.error(err);
					})
					.then(() => {
						setCreateloading(false);
					});
			})
			.catch((err) => {
				toast.error("Something went wrong");
				console.error(err);
			})
			.finally(() => {});
	};
	return (
		<Grid item>
			<Card variant="outlined">
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Create a room
					</Typography>

					<Typography variant="body2" color="text.secondary">
						Creates a new private room to play with your friends!
					</Typography>
				</CardContent>
				<CardActions>
					<LoadingButton
						loading={createLoading}
						variant="contained"
						onClick={createRoom}
						fullWidth
					>
						Create room
					</LoadingButton>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default CreateRoom;

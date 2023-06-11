// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { db, roomsRef } from "@config/firebase";
import { RoomDoc } from "@Types/DocTypes";
import {
	addDoc,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";
import UserIdContext from "@contexts/UserIdContext";

interface CreateRoomProps {}

const CreateRoom: FunctionComponent<CreateRoomProps> = () => {
	const [createLoading, setCreateLoading] = useState<boolean>(false);
	const [userIdContext] = useContext(UserIdContext);
	const navigate = useNavigate();

	const updateOtherRooms = async (uid: string) => {
		const q = query(roomsRef, where("uid", "==", uid));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((roomDoc) => {
			const roomTyped = roomDoc.data() as RoomDoc;
			deleteDoc(doc(db, "rooms", roomTyped.roomId));
		});
	};

	const addRoomDoc = (newRoom: RoomDoc) => {
		try {
			addDoc(roomsRef, newRoom).then((res) => {
				const roomId = res.id;
				updateDoc(doc(db, "rooms", roomId), {
					roomId: roomId,
				}).then(() => {
					navigate("/" + roomId);
				});
			});
		} catch (err) {
			toast.error("Something went wrong");
			console.error(err);
		} finally {
			setCreateLoading(false);
		}
	};

	const createRoom = async () => {
		setCreateLoading(true);
		try {
			const newRoom: RoomDoc = {
				uid: userIdContext,
				currentCard: { color: "black", type: "wild" },
				currentPlayerUid: "",
				currentDirection: "cw",
				players: [],
				roomId: "",
			};

			updateOtherRooms(userIdContext).then(() => {
				addRoomDoc(newRoom);
			});
		} catch (err) {
			toast.error("Something went wrong");
			console.error(err);
		}
	};
	return (
		<Grid item>
			<Card variant="elevation" elevation={4}>
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

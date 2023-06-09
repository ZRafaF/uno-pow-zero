// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { auth, db, roomsRef } from "@config/firebase";
import { signInAnonymously } from "firebase/auth";
import RoomDoc from "@Types/RoomDoc";
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

interface CreateRoomProps {}

const CreateRoom: FunctionComponent<CreateRoomProps> = () => {
	const [createLoading, setCreateLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const updateOtherRooms = async (uid: string) => {
		const q = query(roomsRef, where("creatorUid", "==", uid));
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
				console.log(res.id);
				updateDoc(doc(db, "rooms", roomId), {
					roomId: roomId,
				}).then(() => {
					navigate("/" + roomId + "/room");
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
			signInAnonymously(auth).then((userSign) => {
				const creatorUid = userSign.user.uid;
				const newRoom: RoomDoc = {
					uid: creatorUid,
					currentCard: { color: "black", type: "wild" },
					currentPlayerUid: "",
					currentDirection: "cw",
					playersUid: [creatorUid],
					roomId: "",
				};

				updateOtherRooms(creatorUid).then(() => {
					addRoomDoc(newRoom);
				});
			});
		} catch (err) {
			toast.error("Something went wrong");
			console.error(err);
		}
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

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PlayerCards from "@components/PlayerCards/PlayerCards";
import { makeCard } from "@helper/cardHelper";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { auth, db, playersRef } from "@config/firebase";
import RoomDoc from "@Types/RoomDoc";
import { useSignOut } from "react-firebase-hooks/auth";
import UserIdContext from "@contexts/UserIdContext";
import PlayerDoc from "@Types/PlayerDoc";

const cardsArray = [
	makeCard("black", "wild"),
	makeCard("blue", "2"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("blue", "3"),
	makeCard("red", "3"),
	makeCard("yellow", "3"),
	makeCard("red", "3"),
	makeCard("red", "2"),
	makeCard("green", "3"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("red", "5"),
	makeCard("blue", "3"),
	makeCard("red", "0"),
	makeCard("red", "2"),
	makeCard("red", "3"),
	makeCard("green", "3"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("yellow", "3"),
	makeCard("yellow", "2plus"),
];

interface RoomProps {}

const Room: FunctionComponent<RoomProps> = () => {
	const roomId = useParams().roomId;
	const navigate = useNavigate();

	const [userIdContext, setUserIdContext] = useContext(UserIdContext);

	const [invalidUser, setInvalidUser] = useState<boolean>(false);

	const [signOut] = useSignOut(auth);

	const [roomDocument, loadingRoom, errorRoom] = useDocument(
		doc(db, "rooms", roomId ? roomId : "-1"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const playerQuerry = query(
		playersRef,
		where("uid", "==", userIdContext.uid)
	);

	const [playerDocument] = useCollection(playerQuerry, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	const roomData = roomDocument?.data() as RoomDoc;

	useEffect(() => {
		if (playerDocument) {
			playerDocument.forEach((playerDoc) => {
				const playerTyped = playerDoc.data() as PlayerDoc;
				if (playerTyped.roomId !== roomId) {
					setInvalidUser(true);
				}
			});
		}
	}, [playerDocument, roomId]);

	useEffect(() => {
		if (!userIdContext.playerDocId) {
			setInvalidUser(true);
		}
	}, [userIdContext, invalidUser]);

	if (invalidUser) {
		navigate("/" + roomId + "/login");
		return <></>;
	}

	if ((!roomData && !loadingRoom) || !roomId || errorRoom) {
		navigate("/404");
		return <></>;
	}

	const exitRoom = () => {
		setUserIdContext({ playerDocId: "", uid: userIdContext.uid });
	};

	return (
		<div>
			<button onClick={() => signOut()}> signout </button>
			<button onClick={() => exitRoom()}> Exit room </button>
			<button onClick={() => navigate("/")}> Home </button>
			Room {roomId}
			<PlayerCards cards={cardsArray} />
		</div>
	);
};

export default Room;

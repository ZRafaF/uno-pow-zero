// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChooseUsername from "@components/ChooseUsername/ChooseUsername";
import PlayerCards from "@components/PlayerCards/PlayerCards";
import { makeCard } from "@helper/cardHelper";
import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "@config/firebase";
import RoomDoc from "@Types/RoomDoc";

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

	const [roomDocument, loading, error] = useDocument(
		doc(db, "rooms", roomId ? roomId : "-1"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const roomData = roomDocument?.data() as RoomDoc;

	if ((!roomData && !loading) || !roomId || error) {
		navigate("/404");
		return <></>;
	}

	console.log(roomData);

	return (
		<div>
			<ChooseUsername roomId={roomId} />
			Room {roomId}
			<PlayerCards cards={cardsArray} />
		</div>
	);
};

export default Room;

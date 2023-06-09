// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PlayerCards from "@components/PlayerCards/PlayerCards";
import { makeCard } from "@helper/cardHelper";
import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { auth } from "@config/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import { DocsContext } from "@contexts/DocsContext";
import useCheckRoom from "@hooks/useCheckRoom";

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
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "";
	const navigate = useNavigate();
	const [docsContext] = useContext(DocsContext);

	useCheckRoom(roomId, docsContext.room);
	useEffect(() => {
		let hasPlayer = false;
		docsContext.player.docs.forEach((element) => {
			if (element.roomId === roomId) {
				hasPlayer = true;
			}
		});
		if (!hasPlayer) {
			navigate("/" + roomId + "/login");
		}
	}, [docsContext, navigate, roomId]);

	const [signOut] = useSignOut(auth);

	const exitRoom = () => {};

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

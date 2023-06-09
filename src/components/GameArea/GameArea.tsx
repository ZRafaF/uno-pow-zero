// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PlayerCards from "@components/PlayerCards/PlayerCards";
import { auth } from "@config/firebase";
import { makeCard } from "@helper/cardHelper";
import { Container } from "@mui/material";
import React from "react";
import { FunctionComponent } from "react";
import { useSignOut } from "react-firebase-hooks/auth";

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

interface GameAreaProps {
	roomId: string;
}

const GameArea: FunctionComponent<GameAreaProps> = ({ roomId }) => {
	const [signOut] = useSignOut(auth);

	return (
		<Container>
			Room {roomId}
			<button onClick={() => signOut()}> signout </button>
			<PlayerCards cards={cardsArray} />
		</Container>
	);
};

export default GameArea;

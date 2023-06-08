// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChooseUsername from "@components/ChooseUsername/ChooseUsername";
import PlayerCards from "@components/PlayerCards/PlayerCards";
import { makeCard } from "@helper/cardHelper";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

interface RoomProps {}

const Room: FunctionComponent<RoomProps> = () => {
	const roomId = useParams().roomId;
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

	return (
		<div>
			<ChooseUsername />
			Room {roomId}
			<PlayerCards cards={cardsArray} />
		</div>
	);
};

export default Room;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PlayerCards from "@components/PlayerCards/PlayerCards";
import { makeCard } from "@helper/cardHelper";
import { FunctionComponent } from "react";

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
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
			Game page
			<PlayerCards cards={cardsArray} />
		</div>
	);
};

export default Game;

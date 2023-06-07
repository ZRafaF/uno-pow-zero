// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardComp from "@components/CardComp/CardComp";
import { makeCard } from "@helper/cardHelper";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { FunctionComponent } from "react";

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
	return (
		<div>
			<ScrollingCarousel>
				<CardComp card={makeCard("black", "wild")} />
				<CardComp card={makeCard("blue", "2")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("blue", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("yellow", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "2")} />
				<CardComp card={makeCard("green", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "5")} />
				<CardComp card={makeCard("blue", "3")} />
				<CardComp card={makeCard("red", "0")} />
				<CardComp card={makeCard("red", "2")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("green", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("yellow", "3")} />
				<CardComp card={makeCard("red", "7")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "8")} />
				<CardComp card={makeCard("blue", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("red", "3")} />
				<CardComp card={makeCard("green", "1")} />
				<CardComp card={makeCard("yellow", "2plus")} />
			</ScrollingCarousel>
			Game page
		</div>
	);
};

export default Game;

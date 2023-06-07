// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import CardComp from "@components/CardComp/CardComp";
import StyleModule from "./PlayerCards.module.css";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { FunctionComponent, ReactElement } from "react";

interface PlayerCardsProps {
	cards: Card[];
}

const PlayerCards: FunctionComponent<PlayerCardsProps> = ({ cards }) => {
	const makeCards: Function = (): ReactElement[] => {
		const cardsElements = cards.map((card, idx) => {
			return <CardComp card={card} key={`card_${idx}`} />;
		});
		return cardsElements;
	};

	return (
		<div className={StyleModule.player_cards_div}>
			<ScrollingCarousel className={StyleModule.carousel}>
				{makeCards()}{" "}
			</ScrollingCarousel>
		</div>
	);
};

export default PlayerCards;

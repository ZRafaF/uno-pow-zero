// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card, { CardColor, CardType } from "@Types/Card";

export function makeCard(cardColor: CardColor, cardType: CardType): Card {
	return { color: cardColor, type: cardType };
}

export function getCardImage(card: Card) {
	if (
		card.color === "black" &&
		!(card.type === "4plus" || card.type === "wild")
	) {
		return (
			process.env.PUBLIC_URL +
			"/assets/Uno/individual/card_back/card_back.png"
		);
	}
	const imgPath =
		process.env.PUBLIC_URL +
		`/assets/Uno/individual/${card.color}/${card.type}_${card.color}.png`;

	return imgPath;
}

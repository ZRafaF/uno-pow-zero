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
	if (card.color === "card_back") {
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

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const possibleColors: CardColor[] = [
	"black",
	"blue",
	"blue",
	"blue",
	"blue",
	"blue",
	"blue",
	"green",
	"green",
	"green",
	"green",
	"green",
	"green",
	"red",
	"red",
	"red",
	"red",
	"red",
	"red",
	"yellow",
	"yellow",
	"yellow",
	"yellow",
	"yellow",
	"yellow",
];
const possibleTypesBlack: CardType[] = ["4plus", "wild"];
const possibleTypes: CardType[] = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"2plus",
	"block",
	"inverse",
];

export function makeRandomCard() {
	const cardColor = possibleColors[getRndInteger(0, possibleColors.length)];
	const cardType =
		cardColor === "black"
			? possibleTypesBlack[getRndInteger(0, possibleTypesBlack.length)]
			: possibleTypes[getRndInteger(0, possibleTypes.length)];
	return makeCard(cardColor, cardType);
}

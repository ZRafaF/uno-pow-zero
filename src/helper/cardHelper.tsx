// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card, { CardColor, CardType } from "@Types/Card";

export function makeCard(cardColor: CardColor, cardType: CardType): Card {
	return { color: cardColor, type: cardType };
}

export function getCardImage(card: Card) {
	if (card.color === "black") {
		return (
			process.env.PUBLIC_URL +
			`/assets/Uno/individual/black/${card.type}_black.png`
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

export function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const possibleColors: CardColor[] = ["blue", "green", "red", "yellow"];
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
	"wild",
	"4plus",
];

const possibleStartingTypes: CardType[] = [
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
];

export function makeRandomCard() {
	const cardType = possibleTypes[getRndInteger(0, possibleTypes.length)];
	const cardColor =
		cardType === "4plus" || cardType === "wild"
			? "black"
			: possibleColors[getRndInteger(0, possibleColors.length)];
	return makeCard(cardColor, cardType);
}

export function makeStartingCard() {
	let cardColor = possibleColors[getRndInteger(0, possibleColors.length)];

	const cardType =
		possibleStartingTypes[getRndInteger(0, possibleStartingTypes.length)];
	return makeCard(cardColor, cardType);
}

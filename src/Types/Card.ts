// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export type CardColor =
	| "blue"
	| "green"
	| "red"
	| "yellow"
	| "card_back"
	| "black";

export type CardType =
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "block"
	| "inverse"
	| "2plus"
	| "wild"
	| "4plus"
	| "";

interface Card {
	color: CardColor;
	type: CardType;
}

export default Card;

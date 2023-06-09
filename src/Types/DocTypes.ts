// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Card from "./Card";

export interface CardsDoc {
	cards: Card[];
	cardsDocId: string;
	uid: string;
	playerDocId: string;
}

export interface PlayerDoc {
	cardsDocId: string;
	pfp: string;
	roomId: string;
	uid: string;
	username: string;
	playerDocId: string;
}

export interface RoomDoc {
	uid: string;
	currentCard: Card;
	currentDirection: "cw" | "ccw";
	currentPlayerUid: string;
	playersUid: string[];
	roomId: string;
}

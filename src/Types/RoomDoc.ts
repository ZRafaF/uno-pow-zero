// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "./Card";

export default interface RoomDoc {
	uid: string;
	currentCard: Card;
	currentDirection: "cw" | "ccw";
	currentPlayerUid: string;
	playersUid: string[];
	roomId: string;
}

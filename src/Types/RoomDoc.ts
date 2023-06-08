// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "./Card";

export default interface RoomDoc {
	creatorUid: string;
	currentCard: Card;
	currentDirection: "cw" | "ccw";
	playersUid: string[];
	roomId: string;
}

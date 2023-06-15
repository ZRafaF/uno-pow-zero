// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RoomDoc } from "@Types/DocTypes";
import { db } from "@config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Card from "@Types/Card";

export const endTurn = (roomDoc: RoomDoc) => {
	let newPlayersArray = [...roomDoc.players];
	const numberOfPlayers = roomDoc.players.length;
	const currentPlayerIdx: number = newPlayersArray.findIndex((elem) => {
		if (elem.uid === roomDoc.currentPlayerUid) return true;
		return false;
	});
	if (currentPlayerIdx === -1)
		throw new Error("Player not found, uid: " + roomDoc.currentPlayerUid);

	const nextPlayerCw =
		currentPlayerIdx + 1 >= numberOfPlayers ? 0 : currentPlayerIdx + 1;

	const nextPlayerCcw =
		currentPlayerIdx - 1 < 0 ? numberOfPlayers - 1 : currentPlayerIdx - 1;

	const nextPlayerIdx: number =
		roomDoc.currentDirection === "cw" ? nextPlayerCw : nextPlayerCcw;

	const nextPlayerUid = roomDoc.players[nextPlayerIdx].uid;

	return updateDoc(doc(db, "rooms", roomDoc.roomId), {
		currentPlayerUid: nextPlayerUid,
	});
};

export const playCard = (roomDoc: RoomDoc, uid: string, cardIdx: number) => {
	if (roomDoc.currentPlayerUid !== uid) return;

	let newPlayersArray = [...roomDoc.players];
	newPlayersArray.forEach((element) => {
		if (uid === element.uid) {
			element.cards.splice(cardIdx, 1);
		}
	});

	return updateDoc(doc(db, "rooms", roomDoc.roomId), {
		players: newPlayersArray,
	});
};

export const addNewCard = (roomDoc: RoomDoc, uid: string, newCard: Card) => {
	let newPlayersArray = [...roomDoc.players];

	newPlayersArray.forEach((element) => {
		if (uid === element.uid) {
			element.cards.push(newCard);
		}
	});

	return updateDoc(doc(db, "rooms", roomDoc.roomId), {
		players: newPlayersArray,
	});
};

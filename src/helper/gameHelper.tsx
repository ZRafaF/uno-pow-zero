// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Player, RoomDoc } from "@Types/DocTypes";
import { db } from "@config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Card from "@Types/Card";

export const getIndexFromUid = (players: Player[], uid: string) => {
	return players.findIndex((elem) => {
		if (elem.uid === uid) return true;
		return false;
	});
};

export const endTurn = (roomDoc: RoomDoc) => {
	const numberOfPlayers = roomDoc.players.length;
	const currentPlayerIdx: number = getIndexFromUid(
		roomDoc.players,
		roomDoc.currentPlayerUid
	);
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

export const isPlayValid = (myCard: Card, currentCard: Card) => {
	if (myCard.color === currentCard.color) return true;
	if (myCard.type === currentCard.type) return true;
	if (myCard.type === "wild" || myCard.type === "4plus") return true;

	return false;
};

export const playCard = async (
	roomDoc: RoomDoc,
	uid: string,
	cardIdx: number,
	myCard: Card
) => {
	if (roomDoc.currentPlayerUid !== uid) return;

	if (!isPlayValid(myCard, roomDoc.currentCard)) {
		return false;
	}

	let newPlayersArray = [...roomDoc.players];
	let newLastCardsArray = [...roomDoc.lastCards];
	newLastCardsArray.unshift(roomDoc.currentCard);
	newPlayersArray.forEach((element) => {
		if (uid === element.uid) {
			element.cards.splice(cardIdx, 1);
		}
	});

	const newDirection =
		myCard.type === "inverse"
			? roomDoc.currentDirection === "cw"
				? "ccw"
				: "cw"
			: roomDoc.currentDirection;

	await updateDoc(doc(db, "rooms", roomDoc.roomId), {
		players: newPlayersArray,
		currentCard: myCard,
		lastCards: newLastCardsArray,
		currentDirection: newDirection,
	});
	return true;
};

export const swapCards = async (
	roomDoc: RoomDoc,
	player1Id: string,
	player2Id: string
) => {
	const player1Index = getIndexFromUid(roomDoc.players, player1Id);
	const player2Index = getIndexFromUid(roomDoc.players, player2Id);

	const player1Cards = [...roomDoc.players[player1Index].cards];
	const player2Cards = [...roomDoc.players[player2Index].cards];

	let newPlayersArray = [...roomDoc.players];
	newPlayersArray[player1Index].cards = player2Cards;
	newPlayersArray[player2Index].cards = player1Cards;

	await updateDoc(doc(db, "rooms", roomDoc.roomId), {
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

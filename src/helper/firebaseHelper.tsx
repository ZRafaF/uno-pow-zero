// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { playersRef } from "@config/firebase";
import { getDocs, query, where } from "firebase/firestore";
import PlayerDoc from "@Types/PlayerDoc";

export const getPlayerDocUid = async (uid: string) => {
	const q = query(playersRef, where("uid", "==", uid));
	const querySnapshot = await getDocs(q);
	let playerDocId: string = "";
	querySnapshot.forEach((playerDoc) => {
		const playerTyped = playerDoc.data() as PlayerDoc;
		playerDocId = playerTyped.playerDocId;
	});

	return playerDocId;
};

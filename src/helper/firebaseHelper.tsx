// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlayerDoc, RoomDoc } from "@Types/DocTypes";

export const checkIfRoomIsValid = (
	roomDocs: RoomDoc[],
	roomId: string
): boolean => {
	let res = false;

	roomDocs.forEach((element) => {
		if (element.roomId === roomId) res = true;
	});

	return res;
};

export const checkIfPlayerIsValid = (
	playerDocs: PlayerDoc[],
	roomId: string
): boolean => {
	let res = false;

	playerDocs.forEach((element) => {
		if (element.roomId === roomId) res = true;
	});

	return res;
};

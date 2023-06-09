// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlayerDoc } from "@Types/DocTypes";
import { PlayerCTX, RoomCTX } from "@Types/DocsCTX";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkIfPlayerIsValid = (
	playerDocs: PlayerDoc[],
	roomId: string
): boolean => {
	let res = false;

	playerDocs.forEach((element) => {
		if (element.roomId === roomId) res = true;
	});

	return res;
};

const useCheckPlayer = (
	roomId: string,
	playerCtx: PlayerCTX,
	roomCtx: RoomCTX
) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!roomCtx.loading && !playerCtx.loading) {
			if (checkIfPlayerIsValid(playerCtx.docs, roomId)) {
				navigate("/" + roomId + "/room");
			}
		}
	}, [roomId, navigate, playerCtx, roomCtx]);
};

export default useCheckPlayer;

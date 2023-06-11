// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RoomDoc } from "@Types/DocTypes";
import { RoomCTX } from "@Types/DocsCTX";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkIfPlayerIsValid = (roomDoc: RoomDoc[], roomId: string): boolean => {
	let res = false;

	roomDoc.forEach((element) => {
		if (element.roomId === roomId) res = true;
	});

	return res;
};

const useCheckPlayer = (roomId: string, roomCtx: RoomCTX) => {
	const navigate = useNavigate();
	useEffect(() => {}, []);
};

export default useCheckPlayer;

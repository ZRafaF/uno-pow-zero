// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RoomDoc } from "@Types/DocTypes";
import { RoomCTX } from "@Types/DocsCTX";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const checkIfRoomIsValid = (roomDocs: RoomDoc[], roomId: string): boolean => {
	let res = false;

	roomDocs.forEach((element) => {
		if (element.roomId === roomId) res = true;
	});

	return res;
};

const useCheckRoom = (
	roomId: string,
	roomCtx: RoomCTX,
	callback?: Function
) => {
	const navigate = useNavigate();

	const [valid, setValid] = useState<boolean>(true);
	console.log(roomId);

	useEffect(() => {
		if (!roomCtx.loading) {
			if (!checkIfRoomIsValid(roomCtx.docs, roomId)) {
				navigate("/" + roomId + "/404");
				if (callback) callback();
				setValid(false);
			}
		}
	}, [roomId, navigate, roomCtx, callback]);

	return [valid];
};

export default useCheckRoom;

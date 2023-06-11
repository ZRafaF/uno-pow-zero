// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AvailableRoomDoc, RoomDoc } from "@Types/DocTypes";
import { AvailableRoomsCTX, RoomCTX } from "@Types/DocsCTX";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const checkIfRoomIsValid = (
	availableRooms: AvailableRoomDoc[],
	roomId: string
): boolean => {
	let res = false;

	availableRooms.forEach((element) => {
		if (element.roomId === roomId) res = true;
	});

	return res;
};

const useCheckRoom = (
	roomId: string,
	availableRoomsCTX: AvailableRoomsCTX,
	callback?: Function
) => {
	const navigate = useNavigate();

	const [valid, setValid] = useState<boolean>(true);
	console.log(roomId);

	useEffect(() => {
		if (!availableRoomsCTX.loading) {
			if (!checkIfRoomIsValid(availableRoomsCTX.docs, roomId)) {
				navigate("/" + roomId + "/404");
				if (callback) callback();
				setValid(false);
			}
		}
	}, [roomId, navigate, availableRoomsCTX, callback]);

	return [valid];
};

export default useCheckRoom;

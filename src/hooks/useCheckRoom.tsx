// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import RoomDoc from "@Types/RoomDoc";
import { checkIfRoomIsValid } from "@helper/firebaseHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckRoom = (roomId: string, roomsDoc: RoomDoc[]) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!checkIfRoomIsValid(roomsDoc, roomId)) {
			navigate("/404");
		}
	}, [roomId]);
};

export default useCheckRoom;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RoomCTX } from "@Types/DocsCTX";
import { checkIfRoomIsValid } from "@helper/firebaseHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useCheckRoom = (roomId: string, roomCtx: RoomCTX) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!roomCtx.loading) {
			if (!checkIfRoomIsValid(roomCtx.docs, roomId)) {
				navigate("/404");
			}
		}
	}, [roomId, navigate, roomCtx]);
};

export default useCheckRoom;

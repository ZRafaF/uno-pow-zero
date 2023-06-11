// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { AvailableRoomDoc, RoomDoc } from "@Types/DocTypes";
import { AvailableRoomsCTX, RoomCTX } from "@Types/DocsCTX";
import { availableRoomsRef } from "@config/firebase";
import { getDocs, query } from "firebase/firestore";
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

const useCheckRoom = (roomId: string, callback?: Function) => {
	const navigate = useNavigate();

	const [valid, setValid] = useState<boolean>(true);

	useEffect(() => {
		const q = query(availableRoomsRef);
		getDocs(q)
			.then((querySnapshot) => {
				let foundRoom: boolean = false;
				querySnapshot.forEach((element) => {
					const availableRoomDoc = element.data() as AvailableRoomDoc;
					if (availableRoomDoc.roomId === roomId) foundRoom = true;
				});
				if (!foundRoom) {
					navigate("/" + roomId + "/404");
					if (callback) callback();
					setValid(false);
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, [roomId, navigate, callback]);

	return [valid];
};

export default useCheckRoom;

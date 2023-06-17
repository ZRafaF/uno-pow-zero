// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCheckRoom = (roomId: string, callback?: Function) => {
	const navigate = useNavigate();

	const [valid, setValid] = useState<boolean>(false);

	useEffect(() => {
		const docRef = doc(db, "rooms", roomId);
		getDoc(docRef)
			.then((res) => {
				let foundRoom: boolean = false;
				if (res.exists()) {
					foundRoom = true;
				}
				if (!foundRoom) {
					navigate("/" + roomId + "/404", { replace: true });
					if (callback) callback();
					setValid(false);
				} else setValid(true);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [roomId, navigate, callback]);

	return [valid];
};

export default useCheckRoom;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DocsContext } from "@contexts/DocsContext";
import useCheckRoom from "@hooks/useCheckRoom";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RoomLandingProps {
	roomId: string;
	uid: string;
}

const RoomLanding: FunctionComponent<RoomLandingProps> = ({ roomId, uid }) => {
	const [docsContext] = useContext(DocsContext);
	const navigate = useNavigate();

	const [isRoomIdValid] = useCheckRoom(roomId);

	useEffect(() => {
		if (!docsContext.room.loading && isRoomIdValid) {
			let foundPlayer: boolean = false;
			docsContext.room.doc?.players.forEach((element) => {
				if (uid === element.uid) foundPlayer = true;
			});

			const targetRoom = foundPlayer ? "game" : "login";
			navigate("/" + roomId + "/" + targetRoom);
		}
	}, [roomId, navigate, docsContext, uid, isRoomIdValid]);

	return <React.Fragment></React.Fragment>;
};

export default RoomLanding;

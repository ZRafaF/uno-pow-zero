// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DocsContext } from "@contexts/DocsContext";
import useCheckRoom from "@hooks/useCheckRoom";
import GamePage from "./GamePage/GamePage";

interface RoomProps {}

const Room: FunctionComponent<RoomProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "-1";
	const navigate = useNavigate();
	const [docsContext] = useContext(DocsContext);

	useCheckRoom(roomId, docsContext.room);
	useEffect(() => {
		let hasPlayer = false;
		docsContext.player.docs.forEach((element) => {
			if (element.roomId === roomId) {
				hasPlayer = true;
			}
		});
		if (!hasPlayer) {
			navigate("/" + roomId + "/login");
		}
	}, [docsContext, navigate, roomId]);

	return (
		<div>
			<GamePage />
		</div>
	);
};

export default Room;

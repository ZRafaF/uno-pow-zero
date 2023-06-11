// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import RoomLanding from "@components/RoomLanding/RoomLanding";
import DocsProvider from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";
import { FunctionComponent, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";

interface RoomProps {}

const Room: FunctionComponent<RoomProps> = () => {
	const [userIdContext] = useContext(UserIdContext);

	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "-1";

	return (
		<DocsProvider uid={userIdContext} roomId={roomId}>
			<RoomLanding roomId={roomId} uid={userIdContext} />

			<Outlet />
		</DocsProvider>
	);
};

export default Room;

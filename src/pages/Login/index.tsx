// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Background from "@components/Background/Background";
import ChooseUsername from "@components/ChooseUsername/ChooseUsername";
import { DocsContext } from "@contexts/DocsContext";
import { checkIfPlayerIsValid } from "@helper/firebaseHelper";
import useCheckRoom from "@hooks/useCheckRoom";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "";
	const [docsContext] = useContext(DocsContext);
	const navigate = useNavigate();

	useCheckRoom(roomId, docsContext.room);

	useEffect(() => {
		if (!docsContext.room.loading && !docsContext.player.loading) {
			if (checkIfPlayerIsValid(docsContext.player.docs, roomId)) {
				navigate("/" + roomId + "/room");
			}
		}
	}, [docsContext, roomId, navigate]);

	return (
		<React.Fragment>
			<Background />
			<ChooseUsername roomId={roomId} />
		</React.Fragment>
	);
};

export default Login;

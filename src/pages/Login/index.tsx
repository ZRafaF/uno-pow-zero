// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChooseUsername from "@components/ChooseUsername/ChooseUsername";
import { DocsContext } from "@contexts/DocsContext";
import useCheckPlayer from "@hooks/useCheckPlayer";
//import useCheckRoom from "@hooks/useCheckRoom";
import React, { FunctionComponent, useContext } from "react";
import { useParams } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "";
	const [docsContext] = useContext(DocsContext);

	//useCheckRoom(roomId, docsContext.room);
	useCheckPlayer(roomId, docsContext.room);

	return (
		<React.Fragment>
			<ChooseUsername roomId={roomId} />
		</React.Fragment>
	);
};

export default Login;

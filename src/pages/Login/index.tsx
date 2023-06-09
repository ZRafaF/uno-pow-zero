// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Background from "@components/Background/Background";
import ChooseUsername from "@components/ChooseUsername/ChooseUsername";
import { DocsContext } from "@contexts/DocsContext";
import useCheckRoom from "@hooks/useCheckRoom";
import React, { FunctionComponent, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "";
	const [docsContext, setDocsContext] = useContext(DocsContext);

	useCheckRoom(roomId, docsContext.roomDoc);

	return (
		<React.Fragment>
			<Background />
			<ChooseUsername roomId={roomId} />
		</React.Fragment>
	);
};

export default Login;

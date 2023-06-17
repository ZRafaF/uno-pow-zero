// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChooseUsername from "./ChooseUsername/ChooseUsername";
import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "";

	return (
		<React.Fragment>
			<ChooseUsername roomId={roomId} />
		</React.Fragment>
	);
};

export default Login;

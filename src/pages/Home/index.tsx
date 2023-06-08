// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
import CreateRoomModal from "@components/CreateRoomModal/CreateRoomModal";
import Background from "@components/Background/Background";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [user] = useAuthState(auth);
	console.log(user);

	return (
		<React.Fragment>
			<Background />
			<CreateRoomModal />
		</React.Fragment>
	);
};

export default Home;

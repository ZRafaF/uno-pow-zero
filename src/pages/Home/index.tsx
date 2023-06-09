// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { FunctionComponent } from "react";
import CreateRoomModal from "@components/CreateRoomModal/CreateRoomModal";
import Background from "@components/Background/Background";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<React.Fragment>
			<Background />
			<CreateRoomModal />
		</React.Fragment>
	);
};

export default Home;

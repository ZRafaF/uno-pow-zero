// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { FunctionComponent, useContext } from "react";
import CreateRoomModal from "@components/CreateRoomModal/CreateRoomModal";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Fab } from "@mui/material";
import { ThemeSelectorContext } from "@contexts/ThemeSelectorContext";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [themeSelectorContext, setThemeSelectorContext] =
		useContext(ThemeSelectorContext);

	const toggleTheme = () => {
		setThemeSelectorContext(!themeSelectorContext);
	};

	return (
		<React.Fragment>
			<CreateRoomModal />
			<Fab
				variant="extended"
				aria-label="add"
				sx={{ position: "absolute", bottom: 16, right: 16 }}
				onClick={toggleTheme}
			>
				<Brightness4Icon sx={{ mr: 1 }} /> Toggle Theme
			</Fab>
		</React.Fragment>
	);
};

export default Home;

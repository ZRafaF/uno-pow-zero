// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { FunctionComponent, useContext } from "react";
import CreateRoomModal from "./CreateRoomModal/CreateRoomModal";
import MenuIcon from "@mui/icons-material/Menu";
import {
	Divider,
	Fab,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from "@mui/material";
import { ThemeSelectorContext } from "@contexts/ThemeSelectorContext";
import {
	usePopupState,
	bindTrigger,
	bindMenu,
} from "material-ui-popup-state/hooks";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import DownloadIcon from "@mui/icons-material/Download";
import { usePWAInstall } from "react-use-pwa-install";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const installPwa = usePWAInstall();

	const [themeSelectorContext, setThemeSelectorContext] =
		useContext(ThemeSelectorContext);
	const popupState = usePopupState({
		variant: "popover",
		popupId: "demoMenu",
	});

	const toggleTheme = () => {
		setThemeSelectorContext(!themeSelectorContext);
	};

	return (
		<React.Fragment>
			<CreateRoomModal />
			<Fab
				aria-label="add"
				sx={{ position: "absolute", bottom: 16, right: 16 }}
				{...bindTrigger(popupState)}
			>
				<MenuIcon />
			</Fab>
			<Menu
				{...bindMenu(popupState)}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				transformOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<MenuItem onClick={installPwa}>
					<ListItemIcon>
						<DownloadIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Download APP</ListItemText>
				</MenuItem>
				<Divider />
				<MenuItem onClick={toggleTheme}>
					<ListItemIcon>
						<Brightness6Icon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Toggle theme</ListItemText>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};

export default Home;

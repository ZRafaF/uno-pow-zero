// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Toolbar,
	Typography,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GameArea from "@components/GameArea/GameArea";
import { toast } from "react-toastify";
import { useLongPress } from "use-long-press";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";

const drawerWidth = 240;

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "-1";
	const [mobileOpen, setMobileOpen] = useState(false);

	const bindLongPress = useLongPress(() => {
		copyRoomKey();
	});

	const [signOut] = useSignOut(auth);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const copyRoomKey = () => {
		navigator.clipboard.writeText(roomId);
		toast.success("Room key successfully copied!");
	};

	const drawer = (
		<div>
			<Toolbar
				component={Paper}
				elevation={4}
				sx={{
					display: {
						xs: "none",
						sm: "flex",
					},
				}}
			>
				<Typography variant="h6">Uno Pow Zero</Typography>
			</Toolbar>
			<Toolbar {...bindLongPress()}>
				<Typography variant="caption" display="block">
					Room key: {roomId}
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItem button>
						<ListItemIcon>
							<ShareIcon />
						</ListItemIcon>
						<ListItemText primary="Share Room" />
					</ListItem>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={copyRoomKey}>
						<ListItemIcon>
							<ContentCopyIcon />
						</ListItemIcon>
						<ListItemText primary="Copy key" />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => signOut()}>
						<ListItemIcon>
							<PersonRemoveIcon />
						</ListItemIcon>
						<ListItemText primary="Log out" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItem button component={Link} to={"/"}>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="EXIT" />
					</ListItem>
				</ListItem>
			</List>
		</div>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					display: { sm: "none" },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Uno Pow Zero
					</Typography>
				</Toolbar>
			</AppBar>

			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>

			<Box
				component="main"
				sx={{
					flexGrow: 1,
					display: "flex",

					justifyContent: "center",
				}}
			>
				<GameArea roomId={roomId} />
			</Box>
		</Box>
	);
};

export default Game;

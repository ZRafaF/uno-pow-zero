// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DocsContext } from "@contexts/DocsContext";
import useCheckRoom from "@hooks/useCheckRoom";

import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShareIcon from "@mui/icons-material/Share";
import MenuIcon from "@mui/icons-material/Menu";
import Background from "@components/Background/Background";
import GameArea from "@components/GameArea/GameArea";

const drawerWidth = 240;

interface RoomProps {}

const Room: FunctionComponent<RoomProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "-1";
	const navigate = useNavigate();
	const [docsContext] = useContext(DocsContext);
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	useCheckRoom(roomId, docsContext.room);
	useEffect(() => {
		let hasPlayer = false;
		docsContext.player.docs.forEach((element) => {
			if (element.roomId === roomId) {
				hasPlayer = true;
			}
		});
		if (!hasPlayer) {
			navigate("/" + roomId + "/login");
		}
	}, [docsContext, navigate, roomId]);

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ShareIcon />
						</ListItemIcon>
						<ListItemText primary="Share Room" />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton component={Link} href="/">
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="EXIT" />
					</ListItemButton>
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
					ml: { sm: `${drawerWidth}px` },
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
					p: 3,
					width: drawerWidth,
				}}
			>
				<Toolbar />
				<GameArea roomId={roomId} />
			</Box>
			<Background />
		</Box>
	);
};

export default Room;

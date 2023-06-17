// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DocsContext } from "@contexts/DocsContext";
import useCheckRoom from "@hooks/useCheckRoom";
import React, {
	FunctionComponent,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useNavigate, Link } from "react-router-dom";

import {
	AppBar,
	Avatar,
	AvatarGroup,
	Box,
	Container,
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
import { toast } from "react-toastify";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import DownloadIcon from "@mui/icons-material/Download";
import { ThemeSelectorContext } from "@contexts/ThemeSelectorContext";
import QrCodeListItem from "./QrCodeListItem/QrCodeListItem";
import { usePWAInstall } from "react-use-pwa-install";

const drawerWidth = 240;

interface RoomLandingProps {
	roomId: string;
	uid: string;
	children: ReactNode;
}

const RoomLanding: FunctionComponent<RoomLandingProps> = ({
	roomId,
	uid,
	children,
}) => {
	const [docsContext] = useContext(DocsContext);
	const [themeSelectorContext, setThemeSelectorContext] =
		useContext(ThemeSelectorContext);

	const navigate = useNavigate();

	const [isRoomIdValid] = useCheckRoom(roomId);

	useEffect(() => {
		if (!docsContext.room.loading && isRoomIdValid) {
			let foundPlayer: boolean = false;
			docsContext.room.doc?.players.forEach((element) => {
				if (uid === element.uid) foundPlayer = true;
			});

			if (!foundPlayer) {
				navigate("/" + roomId + "/login", { replace: true });
			} else if (docsContext.room.doc.started) {
				navigate("/" + roomId + "/game", { replace: true });
			} else {
				navigate("/" + roomId + "/waiting", { replace: true });
			}
		}
	}, [roomId, navigate, docsContext, uid, isRoomIdValid]);

	const [mobileOpen, setMobileOpen] = useState(false);

	const [signOut] = useSignOut(auth);

	const installPwa = usePWAInstall();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const copyRoomKey = () => {
		navigator.clipboard.writeText(roomId);
		toast.success("Room key successfully copied!");
	};

	const makeAvatars: Function = (): ReactElement[] => {
		try {
			return docsContext.room.doc.players.map((player, idx) => {
				return (
					<Avatar
						alt={player?.username}
						key={`profile_${player?.username + idx}`}
						src={
							process.env.PUBLIC_URL +
							`/assets/ProfileAnimals/${player?.pfp}.png`
						}
					/>
				);
			});
		} catch (error) {
			return [];
		}
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

			<Toolbar>
				<Typography variant="caption" display="block">
					Room key: {roomId}
				</Typography>
			</Toolbar>

			<Toolbar>
				<AvatarGroup max={4}>{makeAvatars()}</AvatarGroup>
			</Toolbar>
			<Divider />

			<List>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {
							const shareData: ShareData = {
								title: "Uno Pow Zero",
								text: "Let's play a ⁿᵒᵗ uno game?",
								url: window.location.href,
							};
							navigator.share(shareData);
						}}
					>
						<ListItemIcon>
							<ShareIcon />
						</ListItemIcon>
						<ListItemText primary="Share Room" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={copyRoomKey}>
						<ListItemIcon>
							<ContentCopyIcon />
						</ListItemIcon>
						<ListItemText primary="Copy key" />
					</ListItemButton>
				</ListItem>
				<QrCodeListItem />
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {
							setThemeSelectorContext(!themeSelectorContext);
						}}
					>
						<ListItemIcon>
							<Brightness6Icon />
						</ListItemIcon>
						<ListItemText primary="Toggle Theme" />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={installPwa}>
						<ListItemIcon>
							<DownloadIcon />
						</ListItemIcon>
						<ListItemText primary="Install APP" />
					</ListItemButton>
				</ListItem>
			</List>

			<Divider />

			<List>
				<ListItem disablePadding>
					<ListItemButton
						onClick={() => {
							signOut().then(() => {
								navigate("/");
							});
						}}
					>
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
				<Container
					sx={{
						display: "flex",
						position: "absolute",
						height: "stretch",
						width: "stretch",
						flexDirection: "column",
						py: 2,
						alignContent: "center",
					}}
				>
					<Toolbar
						sx={{
							display: { sm: "none" },
						}}
					/>
					{children}
				</Container>
			</Box>
		</Box>
	);
};

export default RoomLanding;

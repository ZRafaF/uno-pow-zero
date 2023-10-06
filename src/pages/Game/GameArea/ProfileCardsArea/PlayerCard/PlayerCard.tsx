// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useContext, useState } from "react";
import StyleModule from "./PlayerCard.module.css";
import {
	Avatar,
	Box,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from "@mui/material";
import { Player } from "@Types/DocTypes";
import CardFooter from "./CardFooter/CardFooter";
import UserIdContext from "@contexts/UserIdContext";
import PersonIcon from "@mui/icons-material/Person";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { DocsContext } from "@contexts/DocsContext";
import { swapCards } from "@helper/gameHelper";
interface PlayerCardProps {
	profile: Player;
	currentPlayerUid: string;
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({
	profile,
	currentPlayerUid,
}) => {
	const [userIdContext] = useContext(UserIdContext);
	const [docsContext] = useContext(DocsContext);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const makeClassName = () => {
		if (profile.uid === currentPlayerUid) {
			return [
				StyleModule.player_card_box,
				StyleModule.current_player,
			].join(" ");
		}
		return StyleModule.player_card_box;
	};

	const handleSwapCards = () => {
		handleClose();
		swapCards(docsContext.room.doc, userIdContext, profile.uid);
	};

	return (
		<>
			<Box
				className={makeClassName()}
				onClick={handleClick}
				sx={{
					width: {
						xs: "60px",
						sm: "65px",
						md: "70px",
						lg: "80px",
					},
					height: {
						xs: "87px",
						sm: "95px",
						md: "105px",
						lg: "110px",
					},
					backgroundColor: "grey.300",
					boxShadow: 3,
				}}
			>
				<Box
					sx={{
						backgroundColor: "grey.800",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					color={"yellow"}
				>
					{userIdContext === profile.uid && (
						<PersonIcon
							sx={{
								mr: 1,
							}}
							color="inherit"
						/>
					)}
					<Typography noWrap color={"white"} textAlign={"center"}>
						{profile.username}
					</Typography>
				</Box>
				<Stack
					sx={{
						backgroundColor: "white",
						boxShadow: 3,
						py: {
							sm: "4px",
							md: "7px",
						},
					}}
					justifyContent="center"
					alignItems="center"
				>
					<Avatar
						alt={profile.pfp}
						src={
							process.env.PUBLIC_URL +
							`/assets/ProfileAnimals/${profile.pfp}.png`
						}
						sx={{
							width: { xs: 40, md: 45, lg: 50 },
							height: { xs: 40, md: 45, lg: 50 },
							boxShadow: 3,
						}}
					/>
				</Stack>
				<Box color={"black"} textAlign={"center"}>
					<CardFooter numberOfCards={profile.cards.length} />
				</Box>
			</Box>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={handleSwapCards}>
					<ListItemIcon>
						<SwapVertIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Swap cards</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default PlayerCard;

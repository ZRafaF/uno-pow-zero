// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import StyleModule from "./PlayerCard.module.css";
import { Avatar, Box, Stack } from "@mui/material";
import { Player } from "@Types/DocTypes";

interface PlayerCardProps {
	profile: Player;
}

const PlayerCard: FunctionComponent<PlayerCardProps> = ({ profile }) => {
	return (
		<Box
			className={StyleModule.player_card_box}
			sx={{
				minWidth: {
					xs: "65px",
					md: "75px",
					lg: "80px",
				},
				minHeight: {
					xs: "80px",
					md: "85px",
					lg: "95px",
				},
				backgroundColor: "grey.300",
				boxShadow: 3,
			}}
		>
			<Box
				sx={{ backgroundColor: "grey.800" }}
				color={"white"}
				textAlign={"center"}
			>
				{profile.username}
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
				{profile.cards.length}
			</Box>
		</Box>
	);
};

export default PlayerCard;

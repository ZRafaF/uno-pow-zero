// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import StyleModule from "./PlayerCard.module.css";
import { Avatar, Box } from "@mui/material";
import { PlayerDoc } from "@Types/DocTypes";

interface PlayerCardProps {
	profile: PlayerDoc;
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
			}}
		>
			<div className={StyleModule.player_card_header}>
				{profile.username}
			</div>
			<Box className={StyleModule.player_card_body}>
				<Avatar
					alt={profile.pfp}
					src={
						process.env.PUBLIC_URL +
						`/assets/ProfileAnimals/${profile.pfp}.png`
					}
				/>
			</Box>
			<div className={StyleModule.player_card_footer}>footer</div>
		</Box>
	);
};

export default PlayerCard;

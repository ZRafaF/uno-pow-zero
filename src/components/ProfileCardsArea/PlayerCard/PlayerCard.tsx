// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import StyleModule from "./PlayerCard.module.css";
import { Box } from "@mui/material";

interface PlayerCardProps {}

const PlayerCard: FunctionComponent<PlayerCardProps> = () => {
	return (
		<Box
			className={StyleModule.player_card_box}
			sx={{
				minWidth: {
					xs: "70px",
					md: "80px",
					lg: "90px",
				},
				minHeight: {
					xs: "85px",
					md: "95px",
					lg: "105px",
				},
			}}
		>
			<div className={StyleModule.player_card_header}>header</div>
			<div className={StyleModule.player_card_body}>body</div>
			<div className={StyleModule.player_card_footer}>footer</div>
		</Box>
	);
};

export default PlayerCard;

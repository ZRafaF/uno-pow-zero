// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardsStack from "@components/CardsStack/CardsStack";
import ProfileCardsArea from "@components/ProfileCardsArea/ProfileCardsArea";
import { Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import GameCenter from "./GameCenter/GameCenter";

interface GameAreaProps {
	roomId: string;
}

const GameArea: FunctionComponent<GameAreaProps> = ({ roomId }) => {
	return (
		<React.Fragment>
			<ProfileCardsArea />
			<Box
				justifyContent="space-around"
				sx={{
					display: "flex",
					flexGrow: 2,
					alignContent: "center",
				}}
			>
				<GameCenter />
			</Box>
			<Box
				sx={{
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<CardsStack />
			</Box>
		</React.Fragment>
	);
};

export default GameArea;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardsStack from "@components/CardsStack/CardsStack";
import ProfileCardsArea from "@components/ProfileCardsArea/ProfileCardsArea";
import { Box, Container, Toolbar } from "@mui/material";
import { FunctionComponent } from "react";
import GameCenter from "./GameCenter/GameCenter";

interface GameAreaProps {
	roomId: string;
}

const GameArea: FunctionComponent<GameAreaProps> = ({ roomId }) => {
	return (
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
		</Container>
	);
};

export default GameArea;

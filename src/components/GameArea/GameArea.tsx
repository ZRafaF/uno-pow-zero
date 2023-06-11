// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardsStack from "@components/CardsStack/CardsStack";
import ProfileCardsArea from "@components/ProfileCardsArea/ProfileCardsArea";
import { makeCard } from "@helper/cardHelper";
import { Box, Container, Toolbar } from "@mui/material";
import { FunctionComponent } from "react";
import GameCenter from "./GameCenter/GameCenter";

const cardsArray = [
	makeCard("black", "wild"),
	makeCard("blue", "2"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("blue", "3"),
	makeCard("red", "3"),
	makeCard("yellow", "3"),
	makeCard("red", "3"),
	makeCard("red", "2"),
	makeCard("green", "3"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("red", "5"),
	makeCard("blue", "3"),
	makeCard("red", "0"),
	makeCard("red", "2"),
	makeCard("red", "3"),
	makeCard("green", "3"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("red", "3"),
	makeCard("yellow", "3"),
	makeCard("yellow", "2plus"),
];

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
			<Toolbar />

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
				<CardsStack cards={cardsArray} />
			</Box>
		</Container>
	);
};

export default GameArea;

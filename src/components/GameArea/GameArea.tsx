// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardsStack from "@components/CardsStack/CardsStack";
import ProfileCardsArea from "@components/ProfileCardsArea/ProfileCardsArea";
import { Box, Container, Modal, Toolbar } from "@mui/material";
import { FunctionComponent, useState } from "react";
import GameCenter from "./GameCenter/GameCenter";
import StartingGameModal from "./StartingGameModal/StartingGameModal";

interface GameAreaProps {
	roomId: string;
}

const GameArea: FunctionComponent<GameAreaProps> = ({ roomId }) => {
	const [open, setOpen] = useState(true);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

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

			<StartingGameModal open={open} handleClose={handleClose} />

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

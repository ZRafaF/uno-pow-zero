// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PlayerCards from "./PlayerCards/PlayerCards";
import ProfileCardsArea from "./ProfileCardsArea/ProfileCardsArea";
import { Box, Button } from "@mui/material";
import React, { FunctionComponent, useContext } from "react";
import GameCenter from "./GameCenter/GameCenter";
import UserIdContext from "@contexts/UserIdContext";
import { DocsContext } from "@contexts/DocsContext";
import { endTurn } from "@helper/gameHelper";

interface GameAreaProps {
	roomId: string;
}

const GameArea: FunctionComponent<GameAreaProps> = ({ roomId }) => {
	const [docsContext] = useContext(DocsContext);
	const [userIdContext] = useContext(UserIdContext);

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

			{docsContext.room.doc.currentPlayerUid === userIdContext && (
				<Box
					sx={{
						bottom: 0,
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						alignItems: "center",
						my: 2,
					}}
				>
					<Button
						onClick={() => {
							endTurn(docsContext.room.doc);
						}}
						variant="contained"
						color="warning"
					>
						Encerrar turno
					</Button>
				</Box>
			)}

			<Box
				sx={{
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
				}}
			>
				<PlayerCards />
			</Box>
		</React.Fragment>
	);
};

export default GameArea;

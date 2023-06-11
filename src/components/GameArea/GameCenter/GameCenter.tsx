// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { makeCard } from "@helper/cardHelper";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import MiddleCards from "./MiddleCards/MiddleCards";

interface GameCenterProps {}

const centerCard = makeCard("blue", "2");

const GameCenter: FunctionComponent<GameCenterProps> = () => {
	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing={2}
		>
			<MiddleCards card={centerCard} />
		</Stack>
	);
};

export default GameCenter;

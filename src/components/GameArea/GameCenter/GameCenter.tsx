// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardComp from "@components/CardComp/CardComp";
import { makeCard } from "@helper/cardHelper";
import { FunctionComponent } from "react";

interface GameCenterProps {}

const centerCard = makeCard("black", "wild");

const GameCenter: FunctionComponent<GameCenterProps> = () => {
	return (
		<div>
			<CardComp card={centerCard} />
		</div>
	);
};

export default GameCenter;

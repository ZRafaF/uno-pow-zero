// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getCardImage, makeCard } from "@helper/cardHelper";
import { Stack } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import MiddleCards from "./MiddleCards/MiddleCards";
import { DocsContext } from "@contexts/DocsContext";
import CardPile from "./CardPile/CardPile";

interface GameCenterProps {}

const defaultCard = makeCard("red", "0");

const GameCenter: FunctionComponent<GameCenterProps> = () => {
	const [docsContext] = useContext(DocsContext);
	//const [centerCard, setCenterCard] = useState(defaultCard);
	const [centerCardImage, setCenterCardImage] = useState<string>(
		getCardImage(defaultCard)
	);
	useEffect(() => {
		//setCenterCard(docsContext.room.doc.currentCard);
		setCenterCardImage(getCardImage(docsContext.room.doc.currentCard));
	}, [docsContext]);

	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing={2}
		>
			<CardPile />
			<MiddleCards cardSrc={centerCardImage} />
		</Stack>
	);
};

export default GameCenter;

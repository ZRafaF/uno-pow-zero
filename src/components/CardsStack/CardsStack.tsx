// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import CardComp from "@components/CardComp/CardComp";
import StyleModule from "./CardsStack.module.css";
import { FunctionComponent, ReactElement, useRef } from "react";
import { Stack } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";

interface PlayerCardsProps {
	cards: Card[];
}

const CardsStack: FunctionComponent<PlayerCardsProps> = ({ cards }) => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const makeCards: Function = (): ReactElement[] => {
		const cardsElements = cards.map((card, idx) => {
			return <CardComp card={card} key={`card_${idx}`} />;
		});
		return cardsElements;
	};

	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{ overflowX: "scroll" }}
			{...events}
			ref={ref}
			px={2}
			py={2}
			className={StyleModule.player_cards_stack}
		>
			{makeCards()}
		</Stack>
	);
};

export default CardsStack;

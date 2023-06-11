// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Box } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";
import { FullCardBack, PartialCardBack } from "./CardsBack/CardsBack";

interface CardFooterProps {
	numberOfCards: number;
}

const CardFooter: FunctionComponent<CardFooterProps> = ({ numberOfCards }) => {
	const makeCards: Function = (): ReactElement[] => {
		const cardsElements: ReactElement[] = [];

		for (let i = 0; i < numberOfCards; i++) {
			cardsElements.push(i ? <PartialCardBack /> : <FullCardBack />);
		}

		return cardsElements;
	};

	return (
		<Box display={"flex"} height={"100%"} maxHeight={"100%"}>
			<Box width={"70%"}>{makeCards()}</Box>
			<Box bgcolor={"white"} width={"30%"}>
				{numberOfCards}
			</Box>
		</Box>
	);
};

export default CardFooter;

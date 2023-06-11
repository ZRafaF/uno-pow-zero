// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import { getCardImage } from "@helper/cardHelper";
import { FunctionComponent, useState } from "react";
import { Box } from "@mui/material";

interface MiddleCardsProps {
	card: Card;
}

const MiddleCards: FunctionComponent<MiddleCardsProps> = ({ card }) => {
	const [imageSrc] = useState<string>(getCardImage(card));

	return (
		<Box
			sx={{
				width: {
					xs: "80px",
					md: "100px",
					lg: "110px",
				},
			}}
			component="img"
			alt={imageSrc}
			src={imageSrc}
		/>
	);
};

export default MiddleCards;

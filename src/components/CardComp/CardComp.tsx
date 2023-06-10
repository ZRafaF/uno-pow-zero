// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import StyleModule from "./CardComp.module.css";
import { getCardImage } from "@helper/cardHelper";
import { FunctionComponent, useState } from "react";
import { Box } from "@mui/material";

interface CardCompProps {
	card: Card;
}

const CardComp: FunctionComponent<CardCompProps> = ({ card }) => {
	const [imageSrc] = useState<string>(getCardImage(card));

	return (
		<Box
			sx={{
				width: {
					xs: "80px",
					md: "100px",
					lg: "120px",
				},
				outlineColor: "primary",
			}}
			component="img"
			alt={imageSrc}
			src={imageSrc}
			className={StyleModule.card_img}
		/>
	);
};

export default CardComp;

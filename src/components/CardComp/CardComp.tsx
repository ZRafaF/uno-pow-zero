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
	callbackFunc?: CallableFunction;
}

const CardComp: FunctionComponent<CardCompProps> = ({ card, callbackFunc }) => {
	const [imageSrc] = useState<string>(getCardImage(card));

	return (
		<Box
			sx={{
				width: {
					xs: "80px",
					md: "100px",
					lg: "110px",
				},
				outlineColor: "primary",
			}}
			component="img"
			alt={imageSrc}
			src={imageSrc}
			className={StyleModule.card_img}
			onClick={() => {
				if (callbackFunc) {
					callbackFunc();
				}
			}}
		/>
	);
};

export default CardComp;

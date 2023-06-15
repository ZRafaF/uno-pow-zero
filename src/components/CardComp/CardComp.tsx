// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import StyleModule from "./CardComp.module.css";
import { getCardImage } from "@helper/cardHelper";
import { FunctionComponent, useEffect, useState } from "react";
import { Box } from "@mui/material";

interface CardCompProps {
	card: Card;
	index?: number;
	callbackFunc?: CallableFunction;
}

const CardComp: FunctionComponent<CardCompProps> = ({
	card,
	callbackFunc,
	index = -1,
}) => {
	const [imageSrc, setImageSrc] = useState<string>(getCardImage(card));

	useEffect(() => {
		setImageSrc(getCardImage(card));
	}, [card]);

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
			className={StyleModule.card_img}
			onClick={() => {
				if (callbackFunc) {
					callbackFunc(index);
				}
			}}
		/>
	);
};

export default CardComp;

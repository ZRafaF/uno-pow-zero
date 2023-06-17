// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import StyleModule from "./CardComp.module.css";
import { getCardImage } from "@helper/cardHelper";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface CardCompProps {
	card: Card;
	allCards?: Card[];
	index?: number;
	callbackFunc?: CallableFunction;
}

const CardComp: FunctionComponent<CardCompProps> = ({
	card,
	callbackFunc,
	index = -1,
	allCards,
}) => {
	const [imageSrc, setImageSrc] = useState<string>(getCardImage(card));
	const cardRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		setImageSrc(getCardImage(card));
	}, [card]);
	useEffect(() => {
		if (allCards === undefined) return;
		if (allCards.length - 1 === index) {
			cardRef.current?.scrollIntoView();
		}
	}, [allCards, index]);

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
			ref={cardRef}
		/>
	);
};

export default CardComp;

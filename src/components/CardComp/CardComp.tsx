// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import StyleModule from "./CardComp.module.css";
import { getCardImage } from "@helper/cardHelper";
import { FunctionComponent, useState } from "react";

interface CardCompProps {
	card: Card;
}

const CardComp: FunctionComponent<CardCompProps> = ({ card }) => {
	const [imageSrc] = useState<string>(getCardImage(card));

	return (
		<img src={imageSrc} alt={imageSrc} className={StyleModule.card_img} />
	);
};

export default CardComp;

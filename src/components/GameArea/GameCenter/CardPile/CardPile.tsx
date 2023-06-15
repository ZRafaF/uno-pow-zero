// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardComp from "@components/CardComp/CardComp";
import { DocsContext } from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";
import { makeCard, makeRandomCard } from "@helper/cardHelper";
import { endTurn, addNewCard } from "@helper/firebaseHelper";
import { FunctionComponent, useContext } from "react";

interface CardPileProps {}

const CardPile: FunctionComponent<CardPileProps> = () => {
	const [docsContext] = useContext(DocsContext);
	const [userIdContext] = useContext(UserIdContext);

	const cardWasClicked = () => {
		addNewCard(docsContext.room.doc, userIdContext, makeRandomCard()).then(
			() => {
				endTurn(docsContext.room.doc);
			}
		);
	};

	return (
		<CardComp
			card={makeCard("card_back", "")}
			callbackFunc={cardWasClicked}
		/>
	);
};

export default CardPile;

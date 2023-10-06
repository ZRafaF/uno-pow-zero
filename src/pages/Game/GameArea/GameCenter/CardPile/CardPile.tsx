// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardComp from "@components/CardComp/CardComp";
import { DocsContext } from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";
import { makeCard, makeRandomCard } from "@helper/cardHelper";
import { addNewCard } from "@helper/gameHelper";
import { FunctionComponent, useContext } from "react";

interface CardPileProps {}

const CardPile: FunctionComponent<CardPileProps> = () => {
	const [docsContext] = useContext(DocsContext);
	const [userIdContext] = useContext(UserIdContext);

	const cardWasClicked = () => {
		if (docsContext.room.doc.currentPlayerUid !== userIdContext) {
			// return; // Do not let user grab a new card if it's not their turn
		}

		addNewCard(docsContext.room.doc, userIdContext, makeRandomCard()).then(
			() => {
				//endTurn(docsContext.room.doc);
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

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardComp from "@components/CardComp/CardComp";
import { db } from "@config/firebase";
import { DocsContext } from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";
import { makeCard, makeRandomCard } from "@helper/cardHelper";
import { doc, updateDoc } from "firebase/firestore";
import { FunctionComponent, useContext } from "react";

interface CardPileProps {}

const CardPile: FunctionComponent<CardPileProps> = () => {
	const [docsContext] = useContext(DocsContext);
	const [userIdContext] = useContext(UserIdContext);

	const getRandomCard = () => {
		let newPlayersArray = [...docsContext.room.doc.players];

		newPlayersArray.forEach((element) => {
			if (userIdContext === element.uid) {
				element.cards.push(makeRandomCard());
			}
		});

		updateDoc(doc(db, "rooms", docsContext.room.doc.roomId), {
			players: newPlayersArray,
		});
	};

	return (
		<CardComp card={makeCard("black", "0")} callbackFunc={getRandomCard} />
	);
};

export default CardPile;

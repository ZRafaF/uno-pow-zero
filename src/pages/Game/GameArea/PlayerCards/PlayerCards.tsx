// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import CardComp from "@components/CardComp/CardComp";
import { DocsContext } from "@contexts/DocsContext";

import StyleModule from "./PlayerCards.module.css";
import {
	FunctionComponent,
	ReactElement,
	useRef,
	useContext,
	useState,
	useEffect,
} from "react";
import { Stack } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";
import UserIdContext from "@contexts/UserIdContext";
import { getIndexFromUid, playCard } from "@helper/gameHelper";
import useSelectColor from "@hooks/useSelectColor";

interface PlayerCardsProps {}

const PlayerCards: FunctionComponent<PlayerCardsProps> = () => {
	const [docsContext] = useContext(DocsContext);
	const [userIdContext] = useContext(UserIdContext);
	const [myCards, setMyCards] = useState<Card[]>([]);

	const [SelectCardDialog, openDialog] = useSelectColor();

	useEffect(() => {
		docsContext.room.doc.players.forEach((element) => {
			if (userIdContext === element.uid) setMyCards(element.cards);
		});
	}, [docsContext, userIdContext]);

	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const useCard = async (index: number) => {
		if (docsContext.room.doc.currentPlayerUid !== userIdContext) return;
		const roomDoc = docsContext.room.doc;
		const myPlayerIndex = getIndexFromUid(roomDoc.players, userIdContext);
		const myCard: Card = roomDoc.players[myPlayerIndex].cards[index];

		if (myCard.type === "4plus" || myCard.type === "wild") {
			const selectedColor = await openDialog();
			if (selectedColor === undefined) return;
			myCard.color = selectedColor;
		}

		playCard(docsContext.room.doc, userIdContext, index, myCard).then(
			(result) => {
				//if (result) endTurn(docsContext.room.doc);
			}
		);
	};

	const makeCards: Function = (): ReactElement[] => {
		const cardsElements = myCards.map((card, idx) => {
			return (
				<CardComp
					card={card}
					key={`card_${idx}`}
					index={idx}
					callbackFunc={useCard}
					allCards={myCards}
				/>
			);
		});
		return cardsElements;
	};

	return (
		<>
			<Stack
				direction="row"
				spacing={1}
				sx={{ overflowX: "scroll" }}
				{...events}
				maxWidth={800}
				ref={ref}
				px={2}
				py={2}
				className={StyleModule.player_cards_stack}
			>
				{makeCards()}
			</Stack>
			<SelectCardDialog />
		</>
	);
};

export default PlayerCards;

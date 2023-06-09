// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PlayerDoc, RoomDoc, CardsDoc } from "@Types/DocTypes";
import { CardsCTX, PlayerCTX, RoomCTX } from "@Types/DocsCTX";
import { cardsRef, playersRef, roomsRef } from "@config/firebase";
import { query, where } from "firebase/firestore";
import {
	createContext,
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useCollection } from "react-firebase-hooks/firestore";

interface DocsContextProps {
	player: PlayerCTX;
	room: RoomCTX;
	cards: CardsCTX;
}

const docsContextDefault: DocsContextProps = {
	player: { docs: [], loading: false },
	room: { docs: [], loading: false },
	cards: { docs: [], loading: false },
};

export const DocsContext = createContext<
	[DocsContextProps, Dispatch<SetStateAction<DocsContextProps>>]
>([docsContextDefault, () => {}]);

interface DocsProviderProps {
	children: any;
	uid: string;
}

const DocsProvider: FunctionComponent<DocsProviderProps> = ({
	children,
	uid,
}) => {
	const [docsContext, setDocsContext] = useState(docsContextDefault);
	const playerDocQuery = query(playersRef, where("uid", "==", uid));
	const roomDocQuery = query(roomsRef);
	const cardsDocQuery = query(cardsRef, where("uid", "==", uid));
	const [playersSnapshot, playersLoading] = useCollection(playerDocQuery);
	const [roomsSnapshot, roomsLoading] = useCollection(roomDocQuery);
	const [cardsSnapshot, cardsLoading] = useCollection(cardsDocQuery);

	useEffect(() => {
		if (playersSnapshot === undefined) return;
		const playerArray: PlayerDoc[] = [];
		playersSnapshot.forEach((doc) => {
			playerArray.push(doc.data() as PlayerDoc);
		});

		setDocsContext((prevDoc) => {
			const newValue: PlayerCTX = {
				docs: playerArray,
				loading: playersLoading,
			};
			return {
				...prevDoc,
				player: newValue,
			};
		});
	}, [playersSnapshot, setDocsContext, playersLoading]);

	useEffect(() => {
		if (roomsSnapshot === undefined) return;
		const roomArray: RoomDoc[] = [];
		roomsSnapshot.forEach((doc) => {
			roomArray.push(doc.data() as RoomDoc);
		});

		setDocsContext((prevDoc) => {
			const newValue: RoomCTX = {
				docs: roomArray,
				loading: roomsLoading,
			};
			return {
				...prevDoc,
				room: newValue,
			};
		});
	}, [roomsSnapshot, setDocsContext, roomsLoading]);

	useEffect(() => {
		if (cardsSnapshot === undefined) return;
		const cardsArray: CardsDoc[] = [];
		cardsSnapshot.forEach((doc) => {
			cardsArray.push(doc.data() as CardsDoc);
		});

		setDocsContext((prevDoc) => {
			const newValue: CardsCTX = {
				docs: cardsArray,
				loading: cardsLoading,
			};
			return {
				...prevDoc,
				cards: newValue,
			};
		});
	}, [cardsSnapshot, setDocsContext, cardsLoading]);

	useEffect(() => {
		//console.log(docsContext);
	}, [docsContext]);

	return (
		<DocsContext.Provider value={[docsContext, setDocsContext]}>
			{children}
		</DocsContext.Provider>
	);
};

export default DocsProvider;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import CardsDoc from "@Types/CardsDoc";
import PlayerDoc from "@Types/PlayerDoc";
import RoomDoc from "@Types/RoomDoc";
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
	playerDoc: PlayerDoc[];
	roomDoc: RoomDoc[];
	cardsDoc: CardsDoc[];
}

const docsContextDefault: DocsContextProps = {
	playerDoc: [],
	roomDoc: [],
	cardsDoc: [],
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
	const [playersSnapshot] = useCollection(playerDocQuery);
	const [roomsSnapshot] = useCollection(roomDocQuery);
	const [cardsSnapshot] = useCollection(cardsDocQuery);

	useEffect(() => {
		if (playersSnapshot === undefined) return;

		const playerArray: PlayerDoc[] = [];
		playersSnapshot.forEach((doc) => {
			playerArray.push(doc.data() as PlayerDoc);
		});
		setDocsContext((prevDoc) => {
			return {
				...prevDoc,
				playerDoc: playerArray,
			};
		});
	}, [playersSnapshot, setDocsContext]);
	useEffect(() => {
		if (roomsSnapshot === undefined) return;

		const roomArray: RoomDoc[] = [];
		roomsSnapshot.forEach((doc) => {
			roomArray.push(doc.data() as RoomDoc);
		});
		setDocsContext((prevDoc) => {
			return {
				...prevDoc,
				roomDoc: roomArray,
			};
		});
	}, [roomsSnapshot, setDocsContext]);
	useEffect(() => {
		if (cardsSnapshot === undefined) return;

		const cardsArray: CardsDoc[] = [];
		cardsSnapshot.forEach((doc) => {
			cardsArray.push(doc.data() as CardsDoc);
		});
		setDocsContext((prevDoc) => {
			return {
				...prevDoc,
				cardsDoc: cardsArray,
			};
		});
	}, [cardsSnapshot, setDocsContext]);

	useEffect(() => {
		console.log(docsContext);
	}, [docsContext]);

	return (
		<DocsContext.Provider value={[docsContext, setDocsContext]}>
			{children}
		</DocsContext.Provider>
	);
};

export default DocsProvider;

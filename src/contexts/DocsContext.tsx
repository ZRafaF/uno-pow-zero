// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RoomDoc } from "@Types/DocTypes";
import { RoomCTX } from "@Types/DocsCTX";
import { db } from "@config/firebase";
import { doc } from "firebase/firestore";
import {
	createContext,
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useDocument } from "react-firebase-hooks/firestore";

interface DocsContextProps {
	room: RoomCTX;
}

const docsContextDefault: DocsContextProps = {
	room: {
		doc: {
			currentCard: { color: "card_back", type: "" },
			currentDirection: "cw",
			currentPlayerUid: "",
			players: [],
			lastCards: [],
			roomId: "",
			uid: "",
			started: false,
		},
		loading: false,
	},
};

export const DocsContext = createContext<
	[DocsContextProps, Dispatch<SetStateAction<DocsContextProps>>]
>([docsContextDefault, () => {}]);

interface DocsProviderProps {
	children: any;
	roomId: string;
	uid: string;
}

export const DocsProvider: FunctionComponent<DocsProviderProps> = ({
	children,
	roomId,
}) => {
	const [docsContext, setDocsContext] = useState(docsContextDefault);

	const [roomSnapshot, roomLoading] = useDocument(doc(db, "rooms", roomId));

	useEffect(() => {
		if (roomSnapshot === undefined) return;

		setDocsContext((prevDoc) => {
			const newValue: RoomCTX = {
				doc: roomSnapshot.data() as RoomDoc,
				loading: roomLoading,
			};
			return {
				...prevDoc,
				room: newValue,
			};
		});
	}, [roomSnapshot, setDocsContext, roomLoading]);

	useEffect(() => {
		//console.log(docsContext);
	}, [docsContext]);

	return (
		<DocsContext.Provider value={[docsContext, setDocsContext]}>
			{children}
		</DocsContext.Provider>
	);
};

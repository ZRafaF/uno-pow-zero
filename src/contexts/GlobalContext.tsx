// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { createContext, useState, ReactNode } from "react";

type card = {
	color: string;
	type: string;
};

interface GlobalContextProps {
	cards: card[];
	playerId: number;
}

const initialContext: GlobalContextProps = {
	cards: [],
	playerId: 0,
};

export const GlobalContext = createContext<GlobalContextProps>(initialContext);

interface GlobalProviderProps {
	children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
	const [cards, setCards] = useState<card[]>([]);
	const [playerId, setPlayerId] = useState<number>(0);

	return (
		<GlobalContext.Provider
			value={{ cards, setCards, playerId, setPlayerId }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

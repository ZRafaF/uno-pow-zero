// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import React, { createContext, Dispatch, SetStateAction } from "react";

interface GlobalContextProps {
	cards: Card[];
}

export const cardsContextDefault: GlobalContextProps = {
	cards: [],
};

const CardsContext = createContext<
	[GlobalContextProps, Dispatch<SetStateAction<GlobalContextProps>>]
>([cardsContextDefault, () => {}]);

export default CardsContext;

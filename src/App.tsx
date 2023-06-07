import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@pages/Home";
import Game from "@pages/Game";
import CardsContext, { cardsContextDefault } from "@contexts/CardsContext";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@config/firebase";

signInAnonymously(auth).catch(alert);

function App() {
	const [cardsContext, setCardsContext] = useState(cardsContextDefault);

	return (
		<CardsContext.Provider value={[cardsContext, setCardsContext]}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</BrowserRouter>
		</CardsContext.Provider>
	);
}

export default App;

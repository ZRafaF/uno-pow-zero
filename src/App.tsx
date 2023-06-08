import React, { useState } from "react";

import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "@pages/Home";
import Room from "@pages/Room";
import CardsContext, { cardsContextDefault } from "@contexts/CardsContext";
import { ToastContainer } from "react-toastify";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@config/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import PageNotFound from "@pages/PageNotFound";

signInAnonymously(auth).catch(alert);

const darkTheme = createTheme({
	palette: { mode: "light" },
});

function App() {
	const [cardsContext, setCardsContext] = useState(cardsContextDefault);

	return (
		<ThemeProvider theme={darkTheme}>
			<CardsContext.Provider value={[cardsContext, setCardsContext]}>
				<ToastContainer />
				<HashRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/room/:roomId" element={<Room />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</HashRouter>
			</CardsContext.Provider>
		</ThemeProvider>
	);
}

export default App;

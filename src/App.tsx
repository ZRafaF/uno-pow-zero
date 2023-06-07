import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@pages/Home";
import Game from "@pages/Game";
import { GlobalProvider } from "@contexts/GlobalContext";

function App() {
	return (
		<GlobalProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game" element={<Game />} />
				</Routes>
			</BrowserRouter>
		</GlobalProvider>
	);
}

export default App;

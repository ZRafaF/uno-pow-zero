import React, { useEffect, useState } from "react";

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
import UserIdContext, { userIdContextDefault } from "@contexts/UserIdContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "@pages/Login";
import { getPlayerDocUid } from "@helper/firebaseHelper";

signInAnonymously(auth).catch(alert);

const darkTheme = createTheme({
	palette: { mode: "light" },
});

function App() {
	const [cardsContext, setCardsContext] = useState(cardsContextDefault);
	const [userIdContext, setUserIdContext] = useState(userIdContextDefault);

	const [user] = useAuthState(auth);
	useEffect(() => {
		const getPlayerUid = async (uid: string) => {
			const playerDocUid = await getPlayerDocUid(uid);

			setUserIdContext({ uid: uid, playerDocId: playerDocUid });
		};
		if (!user) {
			setUserIdContext({ uid: "", playerDocId: "" });
		} else {
			getPlayerUid(user.uid);
		}
	}, [user]);

	return (
		<ThemeProvider theme={darkTheme}>
			<UserIdContext.Provider value={[userIdContext, setUserIdContext]}>
				<CardsContext.Provider value={[cardsContext, setCardsContext]}>
					<ToastContainer />
					<HashRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/:roomId/room" element={<Room />} />
							<Route path="/:roomId/login" element={<Login />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</HashRouter>
				</CardsContext.Provider>
			</UserIdContext.Provider>
		</ThemeProvider>
	);
}

export default App;

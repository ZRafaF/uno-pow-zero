import { useEffect, useState } from "react";

import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "@pages/Home";
import Room from "@pages/Room";
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
import DocsProvider from "@contexts/DocsContext";
import RoomNotFound from "@pages/RoomNotFound";

signInAnonymously(auth).catch(alert);

const darkTheme = createTheme({
	palette: { mode: "dark" },
});

function App() {
	const [userIdContext, setUserIdContext] = useState(userIdContextDefault);
	const [user] = useAuthState(auth);

	useEffect(() => {
		if (!user) {
			setUserIdContext("");
		} else {
			setUserIdContext(user.uid);
		}
	}, [user]);

	return (
		<ThemeProvider theme={darkTheme}>
			<UserIdContext.Provider value={[userIdContext, setUserIdContext]}>
				<DocsProvider uid={userIdContext}>
					<ToastContainer />
					<HashRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/:roomId/room" element={<Room />} />
							<Route path="/:roomId/login" element={<Login />} />
							<Route
								path="/:roomId/404"
								element={<RoomNotFound />}
							/>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</HashRouter>
				</DocsProvider>
			</UserIdContext.Provider>
		</ThemeProvider>
	);
}

export default App;

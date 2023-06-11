import { useEffect, useState } from "react";

import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "@pages/Home";
import Game from "@pages/Game";
import { ToastContainer } from "react-toastify";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@config/firebase";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import { IconButton, createTheme } from "@mui/material";
import PageNotFound from "@pages/PageNotFound";
import UserIdContext, { userIdContextDefault } from "@contexts/UserIdContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "@pages/Login";
import RoomNotFound from "@pages/RoomNotFound";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Background from "@components/Background/Background";
import Room from "@pages/Room";
signInAnonymously(auth).catch(alert);

const darkTheme = createTheme({
	palette: { mode: "dark" },
});
const lightTheme = createTheme({
	palette: { mode: "light" },
});

function App() {
	const [userIdContext, setUserIdContext] = useState(userIdContextDefault);
	const [user] = useAuthState(auth);

	const [darkModeIsOn, setDarkModeIsOn] = useState<boolean>(true);

	useEffect(() => {
		if (!user) {
			setUserIdContext("");
		} else {
			setUserIdContext(user.uid);
		}
	}, [user]);

	const toggleTheme = () => {
		setDarkModeIsOn(!darkModeIsOn);
	};

	return (
		<ThemeProvider theme={darkModeIsOn ? darkTheme : lightTheme}>
			<IconButton
				size="large"
				sx={{ position: "fixed", right: 0, top: 0, zIndex: 9999 }}
				onClick={toggleTheme}
			>
				<Brightness4Icon />
			</IconButton>
			<Background />

			<UserIdContext.Provider value={[userIdContext, setUserIdContext]}>
				<ToastContainer />
				<HashRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:roomId" element={<Room />}>
							<Route path="game" element={<Game />} />
							<Route path="login" element={<Login />} />
							<Route path="404" element={<RoomNotFound />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</HashRouter>
			</UserIdContext.Provider>
		</ThemeProvider>
	);
}

export default App;

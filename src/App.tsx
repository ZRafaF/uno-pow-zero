import { useEffect, useState } from "react";

import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "@pages/Home";
import Game from "@pages/Game";
import { ToastContainer } from "react-toastify";

import { signInAnonymously } from "firebase/auth";
import { auth } from "@config/firebase";
import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "@pages/PageNotFound";
import UserIdContext, { userIdContextDefault } from "@contexts/UserIdContext";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "@pages/Login";
import RoomNotFound from "@pages/RoomNotFound";
import Background from "@components/Background/Background";
import Room from "@pages/Room";
import { ThemeSelectorProvider } from "@contexts/ThemeSelectorContext";
import Waiting from "@pages/Waiting";
signInAnonymously(auth).catch(alert);

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
		<ThemeSelectorProvider>
			<Background />

			<UserIdContext.Provider value={[userIdContext, setUserIdContext]}>
				<ToastContainer />
				<HashRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:roomId" element={<Room />}>
							<Route path="game" element={<Game />} />
							<Route path="login" element={<Login />} />
							<Route path="waiting" element={<Waiting />} />
							<Route path="404" element={<RoomNotFound />} />
						</Route>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</HashRouter>
			</UserIdContext.Provider>
		</ThemeSelectorProvider>
	);
}

export default App;

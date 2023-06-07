// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [user] = useAuthState(auth);
	console.log(user);

	return <div>Home page</div>;
};

export default Home;

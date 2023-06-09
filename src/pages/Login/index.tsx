// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Background from "@components/Background/Background";
import ChooseUsername from "@components/ChooseUsername/ChooseUsername";
import { db } from "@config/firebase";
import { doc } from "firebase/firestore";
import React, { FunctionComponent } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useNavigate, useParams } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const roomId = useParams().roomId;
	const navigate = useNavigate();

	const [roomDocument, loadingRoom, errorRoom] = useDocument(
		doc(db, "rooms", roomId ? roomId : "-1"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	if ((!roomDocument?.data() && !loadingRoom) || !roomId || errorRoom) {
		navigate("/404");
		return <></>;
	}

	return (
		<React.Fragment>
			<Background />
			<ChooseUsername roomId={roomId} />
		</React.Fragment>
	);
};

export default Login;

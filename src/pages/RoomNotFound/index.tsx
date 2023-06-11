// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";

interface RoomNotFoundProps {}

const RoomNotFound: FunctionComponent<RoomNotFoundProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "";

	return (
		<React.Fragment>
			<h1>Room with key: {roomId} was not found</h1>
			<Link to={"/"}>Home page</Link>
		</React.Fragment>
	);
};

export default RoomNotFound;

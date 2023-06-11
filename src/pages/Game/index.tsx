// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

import GameArea from "@components/GameArea/GameArea";

interface GameProps {}

const Game: FunctionComponent<GameProps> = () => {
	const roomParam = useParams().roomId;
	const roomId: string = roomParam ? roomParam : "-1";
	return <GameArea roomId={roomId} />;
};

export default Game;

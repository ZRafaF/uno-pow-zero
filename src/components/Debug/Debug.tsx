// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DocsContext } from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";
import { makeCard } from "@helper/cardHelper";
import { addNewCard, endTurn } from "@helper/firebaseHelper";
import { Box } from "@mui/material";
import { FunctionComponent, useContext } from "react";

interface DebugProps {}

const Debug: FunctionComponent<DebugProps> = () => {
	const [docsContext] = useContext(DocsContext);
	const [userIdContext] = useContext(UserIdContext);
	return (
		<Box
			position={"fixed"}
			zIndex={1000}
			display={"block"}
			right={0}
			top={0}
		>
			<button
				onClick={() => {
					endTurn(docsContext.room.doc);
				}}
			>
				End Turn
			</button>
			<button
				onClick={() => {
					addNewCard(
						docsContext.room.doc,
						userIdContext,
						makeCard("red", "2plus")
					);
				}}
			>
				Red +2
			</button>
			<button
				onClick={() => {
					addNewCard(
						docsContext.room.doc,
						userIdContext,
						makeCard("blue", "9")
					);
				}}
			>
				blue 9
			</button>
			<button
				onClick={() => {
					addNewCard(
						docsContext.room.doc,
						userIdContext,
						makeCard("black", "wild")
					);
				}}
			>
				Black Wild
			</button>
			<button
				onClick={() => {
					addNewCard(
						docsContext.room.doc,
						userIdContext,
						makeCard("yellow", "9")
					);
				}}
			>
				Yellow 9
			</button>
		</Box>
	);
};

export default Debug;

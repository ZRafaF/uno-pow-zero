// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, ReactElement, useContext, useRef } from "react";
import StyleModule from "./ProfileCardsArea.module.css";

import PlayerCard from "./PlayerCard/PlayerCard";
import { Stack } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";
import { DocsContext } from "@contexts/DocsContext";

interface ProfileCardsAreaProps {}

const ProfileCardsArea: FunctionComponent<ProfileCardsAreaProps> = () => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const [docsContext] = useContext(DocsContext);

	const makeProfileCards: Function = (): ReactElement[] => {
		const cardsElements = docsContext.room.doc.players.map(
			(player, idx) => {
				return <PlayerCard profile={player} key={`profile_${idx}`} />;
			}
		);
		return cardsElements;
	};

	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{
				overflowX: "scroll",
				minHeight: {
					xs: "100px",
					md: "110px",
					lg: "120px",
				},
				mx: {
					xs: "0",
					md: "100px",
					lg: "240px",
				},
				p: {
					xs: 1,
					md: 2,
				},
			}}
			{...events}
			ref={ref}
			className={StyleModule.profile_cards_area_stack}
		>
			{makeProfileCards()}
		</Stack>
	);
};

export default ProfileCardsArea;

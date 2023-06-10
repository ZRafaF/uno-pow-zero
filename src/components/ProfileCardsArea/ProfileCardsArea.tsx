// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, useRef } from "react";
import StyleModule from "./ProfileCardsArea.module.css";

import PlayerCard from "./PlayerCard/PlayerCard";
import { Stack } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";

interface ProfileCardsAreaProps {}

const ProfileCardsArea: FunctionComponent<ProfileCardsAreaProps> = () => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{
				overflowX: "scroll",
				minHeight: {
					xs: "120px",
					md: "130px",
					lg: "140px",
				},
			}}
			{...events}
			ref={ref}
			px={2}
			py={2}
			className={StyleModule.profile_cards_area_stack}
		>
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
			<PlayerCard />
		</Stack>
	);
};

export default ProfileCardsArea;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, ReactElement, useContext, useRef } from "react";
import StyleModule from "./ProfileCardsArea.module.css";
import "react-multi-carousel/lib/styles.css";

import PlayerCard from "./PlayerCard/PlayerCard";
import { Box, Stack } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";
import Carousel from "react-multi-carousel";
import { DocsContext } from "@contexts/DocsContext";

interface ProfileCardsAreaProps {}

const carouselResponsive = {
	desktop: {
		breakpoint: {
			max: 3000,
			min: 1024,
		},
		items: 5,
		slidesToSlide: 4,
		partialVisibilityGutter: 40,
	},
	mobile: {
		breakpoint: {
			max: 464,
			min: 0,
		},
		items: 3,
		slidesToSlide: 2,

		partialVisibilityGutter: 30,
	},
	tablet: {
		breakpoint: {
			max: 1024,
			min: 464,
		},
		items: 4,
		slidesToSlide: 3,

		partialVisibilityGutter: 30,
	},
};

const ProfileCardsArea: FunctionComponent<ProfileCardsAreaProps> = () => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const [docsContext] = useContext(DocsContext);

	const makeProfileCards: Function = (): ReactElement[] => {
		const cardsElements = docsContext.player.docs.map((profile, idx) => {
			return <PlayerCard profile={profile} key={`profile_${idx}`} />;
		});
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

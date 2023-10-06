// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, ReactElement, useContext, useRef } from "react";
import StyleModule from "./ProfileCardsArea.module.css";

import PlayerCard from "./PlayerCard/PlayerCard";
import { Box, Stack } from "@mui/material";
import { useDraggable } from "react-use-draggable-scroll";
import { DocsContext } from "@contexts/DocsContext";
import { getCardImage } from "@helper/cardHelper";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

interface ProfileCardsAreaProps {}

const ProfileCardsArea: FunctionComponent<ProfileCardsAreaProps> = () => {
	const ref =
		useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
	const { events } = useDraggable(ref);

	const [docsContext] = useContext(DocsContext);

	const makeProfileCards: Function = (): ReactElement[] => {
		const cardsElements = docsContext.room.doc.players.map(
			(player, idx) => {
				return (
					<PlayerCard
						profile={player}
						key={`profile_${idx}`}
						currentPlayerUid={docsContext.room.doc.currentPlayerUid}
					/>
				);
			}
		);
		return cardsElements;
	};

	return (
		<Box>
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
			<Box
				sx={{
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
				}}
				color={"white"}
			>
				{docsContext.room.doc.currentDirection === "cw" ? (
					<EastIcon />
				) : (
					<WestIcon />
				)}
			</Box>
			<Stack
				direction="row"
				spacing={1}
				sx={{
					overflowX: "scroll",
					mx: {
						xs: "0",
						md: "100px",
						lg: "240px",
					},
					p: {
						xs: 1,
						md: 1,
					},
				}}
				{...events}
				ref={ref}
				className={StyleModule.last_cards_area_stack}
			>
				{docsContext.room.doc.lastCards.map((card, idx) => {
					if (idx < 20)
						return (
							<Box
								sx={{
									width: {
										xs: "30px",
										md: "30px",
										lg: "30px",
									},
								}}
								component="img"
								alt={getCardImage(card)}
								src={getCardImage(card)}
							/>
						);
					return null;
				})}
			</Stack>
		</Box>
	);
};

export default ProfileCardsArea;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Container, Grid, Paper } from "@mui/material";
import {
	Dispatch,
	FunctionComponent,
	ReactElement,
	SetStateAction,
} from "react";
import AvatarButton from "./AvatarButton/AvatarButton";

const pfpTypes = [
	"chick",
	"chicken",
	"cow",
	"elephant",
	"gorilla",
	"panda",
	"penguin",
	"sloth",
	"zebra",
];

interface PfpPickerProps {
	currentPfp: string | undefined;
	setCurrentPfp: Dispatch<SetStateAction<string | undefined>>;
}

const PfpPicker: FunctionComponent<PfpPickerProps> = ({
	currentPfp,
	setCurrentPfp,
}) => {
	const makePfps: Function = (): ReactElement[] => {
		const pfpElements = pfpTypes.map((pfpName) => {
			return (
				<AvatarButton
					key={pfpName}
					avatarName={pfpName}
					currentPfp={currentPfp}
					setCurrentPfp={setCurrentPfp}
				/>
			);
		});
		return pfpElements;
	};

	return (
		<Paper elevation={2} sx={{ p: 3 }}>
			<Container fixed>
				<Grid container spacing={2} justifyContent="center">
					{makePfps()}
				</Grid>
			</Container>
		</Paper>
	);
};

export default PfpPicker;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import FullCardImg from "./fullCard.png";
import PartialCardImg from "./partialCard.png";
import { Box } from "@mui/material";

interface FullCardBackProps {}

export const FullCardBack: FunctionComponent<FullCardBackProps> = () => {
	return (
		<Box
			sx={{
				height: "15px",
			}}
			component="img"
			alt="full back card"
			src={FullCardImg}
		/>
	);
};

interface PartialCardBackProps {}

export const PartialCardBack: FunctionComponent<PartialCardBackProps> = () => {
	return (
		<Box
			sx={{
				height: "15px",
			}}
			component="img"
			alt="partial card"
			src={PartialCardImg}
		/>
	);
};

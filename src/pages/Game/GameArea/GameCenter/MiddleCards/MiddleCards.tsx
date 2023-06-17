// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { Box } from "@mui/material";

interface MiddleCardsProps {
	cardSrc: string;
}

const MiddleCards: FunctionComponent<MiddleCardsProps> = ({ cardSrc }) => {
	return (
		<Box
			sx={{
				width: {
					xs: "80px",
					md: "100px",
					lg: "110px",
				},
			}}
			component="img"
			alt={cardSrc}
			src={cardSrc}
		/>
	);
};

export default MiddleCards;

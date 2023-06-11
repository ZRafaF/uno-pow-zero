// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface GuestsAreaProps {}

const GuestsArea: FunctionComponent<GuestsAreaProps> = () => {
	return (
		<Typography component="h1" variant="h5">
			Waiting room owner...
		</Typography>
	);
};

export default GuestsArea;

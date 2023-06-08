// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React, { FunctionComponent } from "react";

import { Avatar, Grid, Typography } from "@mui/material";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import CreateRoom from "./CreateRoom/CreateRoom";
import FindRoom from "./FindRoom/FindRoom";

interface RoomOptionProps {}

const RoomOption: FunctionComponent<RoomOptionProps> = () => {
	return (
		<React.Fragment>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<SportsEsportsOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				UPZ 1<sup>0</sup>
			</Typography>
			<Grid
				container
				spacing={2}
				justifyContent="center"
				alignItems="stretch"
				direction="row"
				my={1}
			>
				<FindRoom />
				<CreateRoom />
			</Grid>
		</React.Fragment>
	);
};

export default RoomOption;

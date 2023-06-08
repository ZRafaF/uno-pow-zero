// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { FunctionComponent } from "react";

import { Box, Container, Paper } from "@mui/material";
import RoomOption from "./RoomOption/RoomOption";

interface CreateRoomModalProps {}

const CreateRoomModal: FunctionComponent<CreateRoomModalProps> = () => {
	return (
		<Container component="main" maxWidth="md">
			<Box
				sx={{
					marginTop: 8,
				}}
			>
				<Paper
					elevation={1}
					sx={{
						px: 3,
						py: 3,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<RoomOption />
				</Paper>
			</Box>
		</Container>
	);
};

export default CreateRoomModal;

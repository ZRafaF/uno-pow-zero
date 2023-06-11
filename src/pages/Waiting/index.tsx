// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { DocsContext } from "@contexts/DocsContext";
import UserIdContext from "@contexts/UserIdContext";
import { Box, Container, Paper } from "@mui/material";
import { FunctionComponent, useContext } from "react";
import OwnerArea from "./OwnerArea/OwnerArea";
import GuestsArea from "./GuestsArea/GuestsArea";

interface WaitingProps {}

const Waiting: FunctionComponent<WaitingProps> = () => {
	const [userIdContext] = useContext(UserIdContext);
	const [docsContext] = useContext(DocsContext);

	const getWaitingArea = () => {
		return docsContext.room.doc.uid === userIdContext ? (
			<OwnerArea />
		) : (
			<GuestsArea />
		);
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					mb: 2,
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
					{getWaitingArea()}
				</Paper>
			</Box>
		</Container>
	);
};

export default Waiting;

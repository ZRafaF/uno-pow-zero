// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Stack,
} from "@mui/material";
import React from "react";
import { FunctionComponent, useState } from "react";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QRCode from "react-qr-code";

interface QrCodeListItemProps {}

const QrCodeListItem: FunctionComponent<QrCodeListItemProps> = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<ListItem disablePadding>
				<ListItemButton onClick={handleClickOpen}>
					<ListItemIcon>
						<QrCodeIcon />
					</ListItemIcon>
					<ListItemText primary="QR COde" />
				</ListItemButton>
			</ListItem>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">QR CODE</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Scan the following QR Code to get a link to this room.
					</DialogContentText>
				</DialogContent>
				<Box bgcolor={"white"} component={Paper} variant="outlined">
					<Stack justifyContent="center" alignItems="center" p={2}>
						<QRCode value={window.location.href} />
					</Stack>
				</Box>
				<DialogActions>
					<Button
						variant="contained"
						onClick={() => {
							handleClose();
						}}
						autoFocus
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default QrCodeListItem;

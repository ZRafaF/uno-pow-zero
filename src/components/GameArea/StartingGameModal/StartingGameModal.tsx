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
	TextField,
	Typography,
} from "@mui/material";
import { FunctionComponent } from "react";

interface StartingGameModalProps {
	open: boolean;
	handleClose: () => void;
}

const StartingGameModal: FunctionComponent<StartingGameModalProps> = ({
	open,
	handleClose,
}) => {
	return (
		<Dialog open={open} onClose={handleClose} hideBackdrop>
			<DialogTitle>Subscribe</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To subscribe to this website, please enter your email
					address here. We will send updates occasionally.
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Email Address"
					type="email"
					fullWidth
					variant="standard"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleClose}>Subscribe</Button>
			</DialogActions>
		</Dialog>
	);
};

export default StartingGameModal;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { CardColor } from "@Types/Card";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
interface ColorDialogProps {
	open: boolean;
	onClose: (value: CardColor | undefined) => void;
}

const colors: CardColor[] = ["blue", "green", "yellow", "red"];

function ColorDialog(props: ColorDialogProps) {
	const { onClose, open } = props;

	const handleClose = () => {
		onClose(undefined);
	};

	const handleListItemClick = (value: CardColor) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Select new color</DialogTitle>
			<List sx={{ pt: 0 }}>
				{colors.map((color) => (
					<ListItem disableGutters key={color}>
						<ListItemButton
							onClick={() => {
								handleListItemClick(color);
							}}
						>
							<ListItemAvatar>
								<Avatar
									sx={{
										bgcolor: color,
										color: blue[600],
									}}
								>
									{" "}
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={color} />
						</ListItemButton>
					</ListItem>
				))}
				<ListItem disableGutters key={"select none"}>
					<ListItemButton
						onClick={() => {
							handleClose();
						}}
					>
						<ListItemAvatar>
							<Avatar>
								<CloseIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={"Close"} />
					</ListItemButton>
				</ListItem>
			</List>
		</Dialog>
	);
}

const useSelectColor = () => {
	const [promise, setPromise] = useState<{
		resolve: (value: CardColor | undefined) => void;
	} | null>(null);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const openDialog = () =>
		new Promise<CardColor | undefined>((resolve, reject) => {
			setIsOpen(true);
			setPromise({ resolve });
		})
			.then((response) => {
				return response;
			})
			.catch((err) => {
				console.error(err);

				return undefined;
			});

	const handleClose = (value: CardColor | undefined) => {
		promise?.resolve(value);
		setIsOpen(false);
	};

	const SelectCardDialog = () => (
		<ColorDialog open={isOpen} onClose={handleClose} />
	);

	return [SelectCardDialog, openDialog] as const;
};

export default useSelectColor;

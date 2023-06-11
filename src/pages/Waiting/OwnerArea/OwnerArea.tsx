// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, {
	FunctionComponent,
	useState,
	useContext,
	ChangeEvent,
} from "react";

import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { db } from "@config/firebase";
import { LoadingButton } from "@mui/lab";
import SettingsIcon from "@mui/icons-material/Settings";
import { DocsContext } from "@contexts/DocsContext";
import {
	getRndInteger,
	makeRandomCard,
	makeStartingCard,
} from "@helper/cardHelper";
import Card from "@Types/Card";
import { doc, updateDoc } from "firebase/firestore";

const startingNumberOfCards: number = 7;

interface OwnerAreaProps {}

const OwnerArea: FunctionComponent<OwnerAreaProps> = () => {
	const [sending, setSending] = useState<boolean>(false);
	const [numberOfCards, setNumberOfCards] = useState<number>(
		startingNumberOfCards
	);
	const [validCardNumber, setValidCardNumber] = useState<boolean>(true);
	const [helperText, setHelperText] = useState<string>("");
	const [docsContext] = useContext(DocsContext);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const confirmDialogue = (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Create room?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					After starting no other player will be able to log to the
					room.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					variant="contained"
					onClick={() => {
						startGame();
						handleClose();
					}}
					autoFocus
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);

	const startGame = () => {
		setSending(true);

		let newPlayersArray = [...docsContext.room.doc.players];

		newPlayersArray.forEach((element) => {
			const randomCards: Card[] = [];
			for (let i = 0; i < numberOfCards; i++) {
				randomCards.push(makeRandomCard());
			}
			element.cards = randomCards;
		});

		const startingPlayerUid: string =
			newPlayersArray[getRndInteger(0, newPlayersArray.length)].uid;

		try {
			updateDoc(doc(db, "rooms", docsContext.room.doc.roomId), {
				players: newPlayersArray,
				started: true,
				currentCard: makeStartingCard(),
				currentPlayerUid: startingPlayerUid,
			}).then(() => {
				setSending(false);
			});
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
			setSending(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const numberOfCardsText = data.get("numberOfCards") as string;

		if (!numberOfCards) {
			toast.error("Number of cards");
			return;
		}
		setNumberOfCards(parseInt(numberOfCardsText));
		handleClickOpen();
	};
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const textValue = event.target.value;
		if (!textValue.length) {
			setValidCardNumber(false);
			setHelperText("Invalid number");
			return;
		}
		const numberValue = Number(textValue);
		console.log(numberValue % 1);
		if (numberValue <= 0) {
			setValidCardNumber(false);
			setHelperText("Number must be > 0");

			return;
		}
		if (numberValue % 1) {
			setValidCardNumber(false);
			setHelperText("Number must be an integer");
			return;
		}
		if (numberValue > 999) {
			setValidCardNumber(false);
			setHelperText("Number must be less than 999");
			return;
		}
		setValidCardNumber(true);
		setHelperText("");
	};
	return (
		<React.Fragment>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<SettingsIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Room Settings
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				noValidate
				sx={{ mt: 1 }}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}></Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							margin="normal"
							required
							id="numberOfCards"
							label="Starting Cards"
							name="numberOfCards"
							type="number"
							onChange={handleChange}
							helperText={helperText}
							defaultValue={startingNumberOfCards}
							error={!validCardNumber}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<LoadingButton
							type="submit"
							fullWidth
							size="large"
							loading={sending}
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={!validCardNumber}
						>
							Start
						</LoadingButton>
					</Grid>
				</Grid>
			</Box>
			{confirmDialogue}
		</React.Fragment>
	);
};

export default OwnerArea;

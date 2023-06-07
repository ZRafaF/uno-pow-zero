// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@config/firebase";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Paper,
	TextField,
	ThemeProvider,
	Typography,
	createTheme,
} from "@mui/material";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
const darkTheme = createTheme({
	palette: {},
});

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [user] = useAuthState(auth);
	console.log(user);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
					}}
				>
					<Paper
						elevation={0}
						sx={{
							px: 3,
							py: 3,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
							<SportsEsportsOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							UPZ 1<sup>0</sup>
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								id="room"
								label="Room Number"
								name="room"
								autoComplete="room"
								autoFocus
							/>
							<FormControlLabel
								control={
									<Checkbox
										value="remember"
										color="primary"
									/>
								}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Play
							</Button>
						</Box>
					</Paper>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default Home;

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createTheme, ThemeProvider } from "@mui/material";

import {
	createContext,
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	useState,
} from "react";

const themeSelectorContextDefault: boolean = true;

export const ThemeSelectorContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>]
>([themeSelectorContextDefault, () => {}]);

const darkTheme = createTheme({
	palette: { mode: "dark" },
});
const lightTheme = createTheme({
	palette: { mode: "light" },
});

interface ThemeSelectorProps {
	children: ReactNode;
}

export const ThemeSelectorProvider: FunctionComponent<ThemeSelectorProps> = ({
	children,
}) => {
	const [themeSelectorContext, setThemeSelectorContext] = useState(
		themeSelectorContextDefault
	);

	return (
		<ThemeProvider theme={themeSelectorContext ? darkTheme : lightTheme}>
			<ThemeSelectorContext.Provider
				value={[themeSelectorContext, setThemeSelectorContext]}
			>
				{children}
			</ThemeSelectorContext.Provider>
		</ThemeProvider>
	);
};

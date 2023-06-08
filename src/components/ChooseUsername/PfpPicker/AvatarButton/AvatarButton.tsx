// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Avatar, Grid, IconButton } from "@mui/material";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface AvatarButtonProps {
	avatarName: string;
	currentPfp: string | undefined;
	setCurrentPfp: Dispatch<SetStateAction<string | undefined>>;
}

const AvatarButton: FunctionComponent<AvatarButtonProps> = ({
	avatarName,
	currentPfp,
	setCurrentPfp,
}) => {
	const getBorderStyle = (): "solid" | "hidden" => {
		if (avatarName === currentPfp) {
			return "solid";
		}
		return "hidden";
	};

	const clicked = () => {
		setCurrentPfp(avatarName);
	};

	return (
		<Grid item>
			<IconButton
				color="primary"
				aria-label={`chose ${avatarName} as profile picture`}
				onClick={clicked}
			>
				<Avatar
					alt={avatarName}
					src={`/assets/ProfileAnimals/${avatarName}.png`}
					sx={{
						width: 75,
						height: 75,
						borderStyle: getBorderStyle(),
						borderColor: "blue",
					}}
				/>
			</IconButton>
		</Grid>
	);
};

export default AvatarButton;

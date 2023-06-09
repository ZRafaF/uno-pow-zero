// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "@Types/Card";
import { createContext, Dispatch, SetStateAction } from "react";

interface UserIdContextProps {
	uid: string;
	playerDocId: string;
}

export const userIdContextDefault: UserIdContextProps = {
	uid: "",
	playerDocId: "",
};

const UserIdContext = createContext<
	[UserIdContextProps, Dispatch<SetStateAction<UserIdContextProps>>]
>([userIdContextDefault, () => {}]);

export default UserIdContext;

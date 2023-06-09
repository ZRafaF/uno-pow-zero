// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createContext, Dispatch, SetStateAction } from "react";

export const userIdContextDefault: string = "";

const UserIdContext = createContext<[string, Dispatch<SetStateAction<string>>]>(
	[userIdContextDefault, () => {}]
);

export default UserIdContext;

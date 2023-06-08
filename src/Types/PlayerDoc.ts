// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Card from "./Card";

export default interface playerDoc {
	cards: Card[];
	pfp: string;
	roomId: string;
	uid: string;
	username: string;
}

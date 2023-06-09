// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { PlayerDoc, RoomDoc, CardsDoc } from "@Types/DocTypes";

export interface PlayerCTX {
	docs: PlayerDoc[];
	loading: boolean;
}
export interface RoomCTX {
	docs: RoomDoc[];
	loading: boolean;
}
export interface CardsCTX {
	docs: CardsDoc[];
	loading: boolean;
}

// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import CardsDoc from "@Types/CardsDoc";
import PlayerDoc from "@Types/PlayerDoc";
import RoomDoc from "@Types/RoomDoc";

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

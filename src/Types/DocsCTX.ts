// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { AvailableRoomDoc, RoomDoc } from "@Types/DocTypes";

export interface RoomCTX {
	doc: RoomDoc;
	loading: boolean;
}

export interface AvailableRoomsCTX {
	docs: AvailableRoomDoc[];
	loading: boolean;
}

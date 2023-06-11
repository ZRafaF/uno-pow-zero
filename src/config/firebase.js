// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAY3y-UHk9kz8MNApIbmzh6hPgH2XHtSfs",
	authDomain: "uno-pow-zero.firebaseapp.com",
	projectId: "uno-pow-zero",
	storageBucket: "uno-pow-zero.appspot.com",
	messagingSenderId: "526020933784",
	appId: "1:526020933784:web:c5208b60147feb54c938ed",
	measurementId: "G-P3WCTPY7D7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export const roomsRef = collection(db, "rooms");
export const availableRoomsRef = collection(db, "availableRooms");

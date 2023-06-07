import React from "react";
import logo from "./logo.svg";
import "./App.css";

import card from "@assets/Uno/individual/blue/0_blue.png";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<img src={card} alt="card" />
			</header>
		</div>
	);
}

export default App;

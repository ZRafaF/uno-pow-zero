// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Background from "@components/Background/Background";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	return (
		<React.Fragment>
			<Background />
			<h1>Error 404</h1>
			<Link to={"/"}>Home page</Link>
		</React.Fragment>
	);
};

export default PageNotFound;

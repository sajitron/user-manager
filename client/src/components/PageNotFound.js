import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div>
			404! - Page Not Found! <Link to="/">Go Back Home</Link>
		</div>
	);
};

export default PageNotFound;

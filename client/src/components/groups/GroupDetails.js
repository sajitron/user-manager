import React from 'react';

const GroupDetails = (props) => {
	return <div>Hey! My id is {props.match.params.id}</div>;
};

export default GroupDetails;

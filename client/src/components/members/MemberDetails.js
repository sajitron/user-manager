import React from 'react';

const MemberDetails = (props) => {
	return <div>Hey! My member id is {props.match.params.id}</div>;
};

export default MemberDetails;

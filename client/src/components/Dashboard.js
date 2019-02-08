import React from 'react';
import GroupList from './groups/GroupList';
import MemberList from './members/MemberList';

const Dashboard = () => {
	return (
		<div>
			<div>
				<GroupList />
			</div>
			<div>
				<MemberList />
			</div>
		</div>
	);
};

export default Dashboard;

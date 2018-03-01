import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import SetList from './sets/SetList';

import './style/Dashboard.css';

const Dashboard = () => {
	return (
		<div className="row">
			<SurveyList />
			<SetList />
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red">
					<i className="large material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../actions';
import formFields from './formFields';
import '../style/SurveyFormReview.css'

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={ name } className="input">
				<div className="label">{ label }</div>
				<p>{ formValues[name] }</p>
			</div>
		);
	});

	return (
		<div className="confirm">
			<h5>Please Confirm your enteries</h5>
			<div>
				{ reviewFields }
			</div>
			<div className="button_container">
				<button
					className="btn yellow darken-3 left"
					onClick={ onCancel }
				>
					<i className="large material-icons left">arrow_back</i>
					Back
				</button>
				<button
					onClick={ () => submitSurvey(formValues, history) }
					className="btn green darken-1 right"
				>
					Send Survey
					<i className="material-icons right">email</i>
				</button>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
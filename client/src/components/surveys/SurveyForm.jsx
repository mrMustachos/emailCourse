// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utilities/validateEmails';
import formFields from './formFields';
import '../style/SurveyForm.css'

class SurveyForm extends Component {
	renderformFields() {
		return _.map(formFields, ({ label, type, name }) => {
			return <Field key={ name } component={ SurveyField } type={ type } label={ label } name={ name } />
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) }>
					{ this.renderformFields() }
					<div className="button_container">
						<Link
							to="/surveys"
							className="left red btn"
						>
							Cancel
						</Link>
						<button
							type="submit"
							className="right green darken-1 btn"
						>
							Next
							<i className="material-icons right">done</i>
						</button>
					</div>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.recipients = validateEmails(values.recipients || '');

	_.each(formFields, ({ name, label }) => {
		if (!values[name]) { errors[name] = `You must provide a ${label.toLowerCase()}!`; }
	});

	return errors;
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
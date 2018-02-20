// SurveyField contains logic to render a single lable and text input
import React from 'react';
import '../style/SurveyField.css';

export default ({ input, label, meta }) => {
	// console.log(meta);
	return (
		<div className="row">
			<div className={ meta.touched && meta.error ? 'input-field col s12 invalid' : 'input-field col s12' }>
				<label className={ meta.active || meta.dirty ? 'active' : '' }>{ label }</label>
				<input { ...input } />
				<div className="error_msg">
					{ meta.touched && meta.error }
				</div>
			</div>
		</div>
	);
};
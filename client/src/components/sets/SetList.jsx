import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSetlist } from '../../actions';

class SetList extends Component {
	componentDidMount() {
		this.props.fetchSetlist();
	}

	weLoaded(key) {
		return this.props.sets[key] === undefined ? [] : this.props.sets.setlistdata;
	}

	renderSetList() {
		var count = 1;

		if (this.props.sets.setlistdata === undefined) {
			return <div><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt=""/></div>;
		} else {
			// return this.weLoaded('setlistdata').map(set => {
				return this.props.sets.setlistdata.map(set => {
				return (
					<div key={ set.track } className="col s12">
						{ set.song_name }{ set.foot_note === undefined ? '' : ' - ' }{ set.foot_note === undefined ? '' : `[${count++}] ` }{ set.foot_note }
					</div>
				);
			});
		}
	}

	render() {
		console.log('sets:', this.props.sets)
		console.log('setlistdata:', this.props.sets.setlistdata)
		return (
			<div>
				{ this.renderSetList() }
			</div>
		);
	}
}

function mapStateToProps({ sets }) {
	return { sets };
}

export default connect(mapStateToProps, { fetchSetlist })(SetList);
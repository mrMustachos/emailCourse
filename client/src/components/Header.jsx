import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return <li><a href="/auth/google">Login With Google</a></li>;
			default:
				return [
					<li key="1"><Payments /></li>,
					<li key="2" style={{ padding: '0 15px' }}>
						Credits: <span style={{ fontSize: '110%', fontWeight: '700', lineHeight: '1' }}>{ this.props.auth.credits }</span>
					</li>,
					<li key="3"><a href="/api/logout">Logout</a></li>
				];
		}
	};

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						className="left brand-logo"
						style={{ paddingLeft: '15px' }}
						to={ this.props.auth ? '/surveys' : '/' }
					><i className="large material-icons">email</i>Logo</Link>
					<ul className="right">
						{ this.renderContent() }
					</ul>
				</div>
			</nav>
		);
	}
};

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
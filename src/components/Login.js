import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LoginService from '../services/LoginService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import { COMMON_FIELDS, REGISTRATION_FIELDS, LOGIN_FIELDS, LOGIN_MESSAGE, ERROR_IN_LOGIN } from '../MessageBundle';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.handleOnChangeUserName = this.handleOnChangeUserName.bind(this);
		this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			user_name: '',
			password: '',
			error: false,
			loginSuccess: false
		}
	}

	handleOnChangeUserName(e) {
		this.setState({
			user_name: e.target.value
		});
	}

	handleOnChangePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	async onSubmit(e) {
		const data = {
			user_name: this.state.user_name,
			password: this.state.password
		};

		const loginResult = await LoginService(data);

		if(loginResult !== 200) {
			this.setState({
				error: true,
				loginSuccess: false
			});
		}
		else {
			this.setState({
				loginSuccess: true,
				error: false
			});
		}
	}

	render() {
		const { loginSuccess, error } = this.state;

		return (
			 <div className="Login">
				<h1>{ LOGIN_FIELDS.LOGIN_HEADING }</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<div className="fields">
							<p>{ COMMON_FIELDS.USER_NAME }</p>
							<input type="text" name="Username" onChange={this.handleOnChangeUserName}/>
						</div>
						<div className="fields">
							<p>{ COMMON_FIELDS.PASSWORD }</p>
							<input type="password" name="Password" onChange={this.handleOnChangePassword}/></div>
						<div className="buttons">
							<button type="button" onClick={this.onSubmit} className="btn btn-primary">{ LOGIN_FIELDS.LOGIN }</button>
							<Link to="/register">{ REGISTRATION_FIELDS.REGISTER }</Link>
						</div>
					</div>
				</form>
				{ loginSuccess && <Message message={LOGIN_MESSAGE} /> }
				{ error && <Error message={ERROR_IN_LOGIN} />}
				</div>
			);
		}
}

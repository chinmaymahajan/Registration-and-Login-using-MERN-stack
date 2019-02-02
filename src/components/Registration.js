import React, { Component } from 'react';
import '../styles/App.css';
import RegistrationService from '../services/RegistrationService';
import Message from '../elements/Message';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE } from '../MessageBundle';

export default class Registration extends Component {
	constructor(props) {
		super(props);
		this.handleOnChangeFirstName = this.handleOnChangeFirstName.bind(this);
		this.handleOnChangeLastName = this.handleOnChangeLastName.bind(this);
		this.handleOnChangeUserName = this.handleOnChangeUserName.bind(this);
		this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			first_name: '',
			last_name: '',
			user_name: '',
			password: '',
			register: false
		}
	}

	handleOnChangeFirstName(e) {
		this.setState({
			first_name: e.target.value
		});
	}

	handleOnChangeLastName(e) {
		this.setState({
			last_name: e.target.value
		});
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

		e.preventDefault();
		const data = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			user_name: this.state.user_name,
			password: this.state.password
		};

		const registerStatus = await RegistrationService(data);
			if(registerStatus === 200) {
					this.setState({
					first_name: '',
					last_name: '',
					user_name: '',
					password: '',
					register: true
				});
			}
		}



	render() {
		const { register } = this.state;
		return (
			<div className="Registration">
				<h1>{ REGISTRATION_FIELDS.REGISTRATION_HEADING }</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						{ REGISTRATION_FIELDS.FIRST_NAME } <input type="text" name="FirstName" onChange={this.handleOnChangeFirstName}/> <br />
						{ REGISTRATION_FIELDS.LAST_NAME } <input type="text" name="LastName" onChange={this.handleOnChangeLastName}/> <br />
						{ REGISTRATION_FIELDS.USER_NAME } <input type="text" name="Username" onChange={this.handleOnChangeUserName}/> <br />
						{ REGISTRATION_FIELDS.PASSWORD } <input type="password" name="Password" onChange={this.handleOnChangePassword}/> <br />
						<button type="submit" className="btn btn-primary">{ REGISTRATION_FIELDS.REGISTER }</button>
						<button type="button" className="btn btn-link">{ REGISTRATION_FIELDS.CANCEL }</button>
					</div>
				</form>
				{ register && <Message message={REGISTRATION_MESSAGE} /> }
			</div>
		)
	}
}

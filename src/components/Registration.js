import React, { Component } from 'react';
import RegistrationService from '../services/RegistrationService';
import Login from './Login';
import Message from '../elements/Message';
import { REGISTRATION_FIELDS, REGISTRATION_MESSAGE, COMMON_FIELDS } from '../MessageBundle';

export default class Registration extends Component {
	constructor(props) {
		super(props);

		this.handleOnChangeFirstName = this.handleOnChangeFirstName.bind(this);
		this.handleOnChangeLastName = this.handleOnChangeLastName.bind(this);
		this.handleOnChangeUserName = this.handleOnChangeUserName.bind(this);
		this.handleOnChangePassword = this.handleOnChangePassword.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleOnCancel = this.handleOnCancel.bind(this);

		this.state = {
			first_name: '',
			last_name: '',
			user_name: '',
			password: '',
			register: false,
			cancel: false
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
					register: true,
					cancel: false
				});
			}
		}

		handleOnCancel(e) {
			this.setState({
				cancel: true
			})
		}

	render() {
		const { register, cancel } = this.state;
		return (
			!cancel ?
			<div className="Registration">
				<h1>{ REGISTRATION_FIELDS.REGISTRATION_HEADING }</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<div className="fields"><p>{ REGISTRATION_FIELDS.FIRST_NAME }</p> <input type="text" value={this.state.first_name} name="FirstName" onChange={this.handleOnChangeFirstName}/></div>
						<div className="fields"><p>{ REGISTRATION_FIELDS.LAST_NAME }</p> <input type="text" value={this.state.last_name} name="LastName" onChange={this.handleOnChangeLastName}/></div>
						<div className="fields"><p>{ COMMON_FIELDS.USER_NAME }</p> <input type="text" value={this.state.user_name} name="Username" onChange={this.handleOnChangeUserName}/></div>
						<div className="fields"><p>{ COMMON_FIELDS.PASSWORD }</p> <input type="password" value={this.state.password} name="Password" onChange={this.handleOnChangePassword}/></div>
						<div className="buttons"><button type="submit" className="btn btn-primary">{ REGISTRATION_FIELDS.REGISTER }</button>
						<button type="button" onClick={this.handleOnCancel} className="btn btn-link">{ REGISTRATION_FIELDS.CANCEL }</button></div>
					</div>
				</form>
				{ register && <Message message={REGISTRATION_MESSAGE} /> }
			</div>
			: <Login />
		)
	}
}

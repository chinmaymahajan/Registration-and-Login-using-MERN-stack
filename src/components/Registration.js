import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {
  UserRegistration,
  UsernameValidation,
} from '../services/RegistrationService';
import Message from '../elements/Message';
import Error from '../elements/Error';
import {
  REGISTRATION_FIELDS,
  REGISTRATION_MESSAGE,
  COMMON_FIELDS,
  ERROR_IN_REGISTRATION,
} from '../MessageBundle';

export default class Registration extends Component {
  constructor (props) {
    super (props);
    this.state = {
      first_name: '',
      last_name: '',
      user_name: '',
      password: '',
      register: false,
      error: false,
    };
  }

  handleOnChangeFirstName = e => {
    this.setState ({
      first_name: e.target.value,
    });
  };

  handleOnChangeLastName = e => {
    this.setState ({
      last_name: e.target.value,
    });
  };

  handleOnChangeUserName = e => {
    this.setState ({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = e => {
    this.setState ({
      password: e.target.value,
    });
  };

  handleOnBlur = async e => {
    this.setState ({
      user_name: e.target.value,
    });
    const data = {
      user_name: this.state.user_name,
    };
    const isUsernameTaken = await UsernameValidation (data);

    isUsernameTaken === 204
      ? this.setState ({user_name_taken: true})
      : this.setState ({user_name_taken: false});
  };

  onSubmit = async e => {
    e.preventDefault ();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      user_name: this.state.user_name,
      password: this.state.password,
    };

    const registerStatus = await UserRegistration (data);
    if (registerStatus === 200) {
      this.setState ({
        first_name: '',
        last_name: '',
        user_name: '',
        password: '',
        register: true,
        error: false,
      });
    } else
      this.setState ({
        error: true,
        register: false,
      });
  };

  render () {
    const {register, error, user_name_taken} = this.state;

    return (
      <div className="Registration">
        <h1> {REGISTRATION_FIELDS.REGISTRATION_HEADING} </h1> <form
          onSubmit={this.onSubmit}
        >
          <div>
            <div className="fields">
              <p> {REGISTRATION_FIELDS.FIRST_NAME} </p>
              {' '}
              <input
                type="text"
                value={this.state.first_name}
                name="FirstName"
                onChange={this.handleOnChangeFirstName}
              />
              {' '}
            </div> <div className="fields">
              <p> {REGISTRATION_FIELDS.LAST_NAME} </p>
              {' '}
              <input
                type="text"
                value={this.state.last_name}
                name="LastName"
                onChange={this.handleOnChangeLastName}
              />
              {' '}
            </div> <div className="fields">
              <p> {COMMON_FIELDS.USER_NAME} </p>
              {' '}
              <input
                type="text"
                className={classNames ({error: user_name_taken})}
                value={this.state.user_name}
                name="Username"
                onBlur={this.handleOnBlur}
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div> <div className="fields">
              <p> {COMMON_FIELDS.PASSWORD} </p>
              {' '}
              <input
                type="password"
                value={this.state.password}
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="password"
                required
              />
            </div> <div className="buttons">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={user_name_taken}
              >
                {' '}{REGISTRATION_FIELDS.REGISTER}{' '}
              </button>
              {' '}
              <Link to="/login"> {REGISTRATION_FIELDS.CANCEL} </Link>
              {' '}
            </div>{' '}
          </div>{' '}
        </form>
        {' '}
        {error && <Error message={ERROR_IN_REGISTRATION} />}
        {' '}
        {register && <Message message={REGISTRATION_MESSAGE} />}
        {' '}
      </div>
    );
  }
}

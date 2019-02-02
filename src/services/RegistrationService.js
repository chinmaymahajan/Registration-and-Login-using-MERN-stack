import axios from 'axios';

const RegistrationService = data => {
	axios.post('http://localhost:4000/registration/register', data)
		.then(res => res.status);
}

export default RegistrationService;

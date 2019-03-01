import axios from 'axios';

export const LoginService = data => (
	axios.post('http://localhost:4000/registration/login', data)
		.then(res => res.status)
);

export const GetData = () => (
	axios.get('http://localhost:4000/registration/allData')
	.then(data => data.data)
)

import React from 'react';

const users = ({ userDetails }) => (
	userDetails.map(user => (<li>{user.first_name}</li>))
);

export default users;

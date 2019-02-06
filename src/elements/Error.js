import React from 'react';

const Error = ({ message }) => (
	<div>
		<div className="alert alert-danger" role="alert">
		<span className="glyphicon glyphicon-thumbs-down"></span>
		<span className="message">{message}</span>
	</div>
</div>
);

export default Error;

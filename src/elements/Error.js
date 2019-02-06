import React from 'react';

const Error = ({ message }) => (
	<div>
		<div class="alert alert-danger" role="alert">
		<span class="glyphicon glyphicon-thumbs-down"></span>
		<span className="message">{message}</span>
	</div>
</div>
);

export default Error;

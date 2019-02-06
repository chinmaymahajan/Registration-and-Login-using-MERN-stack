import React from 'react';

const Message = ({ message }) => (
	<div>
		<div className="alert alert-success" role="alert">
		<span className="glyphicon glyphicon-thumbs-up"></span>
		<span className="message">{message}</span>
		</div>
</div>
);

export default Message;

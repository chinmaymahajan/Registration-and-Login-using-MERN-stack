import React from 'react';

const Message = ({ message }) => (
	<div>
		<div class="alert alert-success" role="alert">
		<span class="glyphicon glyphicon-thumbs-up"></span>
		<span className="message">{message}</span>
		</div>
</div>
);

export default Message;

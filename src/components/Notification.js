import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Notification = ({ message, type, }) => {
	return (
		<div className="notification">
			<div className={classNames('content', `content-${type}`)}>
				<div className="text">{message}</div>
			</div>
		</div>
	);
};

Notification.defaultProps = {
	time: 3000,
};

Notification.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default memo(Notification);

import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Input from '../../components/Input';
import Notification from '../../components/Notification';
import { getAllowAdminsRoles } from '../../services/Helper';
import { NOTIFICATIONS_TYPE } from '../../services/Constants';

const SignIn = () => {
	const history = useHistory();

	const [inputValue, setInputValue] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [showNotification, setShowNotification] = useState(false);

	useEffect(() => {
		if (!errorMsg) return;
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false);
			setErrorMsg('');
		}, 2000);
	}, [errorMsg]);

	const handleChange = (value) => {
		setInputValue(value);
	};

	const handleSubmit = (e) => {
		const allowAdminsRoles = getAllowAdminsRoles();
		if (!inputValue) {
			return setErrorMsg('Please enter ID');
		}

		if (allowAdminsRoles.indexOf(inputValue) === -1) {
			return setErrorMsg('Admin not found');
		}

		localStorage.adminRole = inputValue.trim();

		history.push('/search');
		setErrorMsg('');
	};

	return (
		<>
			<div className="wrapper">
				<h2>Sign in</h2>
				<div className="login">
					<div className="input-field">
						<Input
							placeholder="Admin ID"
							onChange={handleChange}
							onKeyDown={handleSubmit}
							value={inputValue}
							focus
						/>
					</div>

					<button
						className={classNames({ active: Boolean(inputValue) }, 'submit-btn')}
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
			{showNotification && <Notification message={errorMsg} type={NOTIFICATIONS_TYPE.ERROR} />}
		</>
	);
};

export default memo(SignIn);

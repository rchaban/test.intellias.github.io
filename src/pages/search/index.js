import React, { memo, useState, useEffect } from 'react';
import { MIN_LENGTH_FOR_SEARCH, ADMINS } from '../../services/Constants';
import Input from '../../components/Input';
import Notification from '../../components/Notification';
import { NOTIFICATIONS_TYPE } from '../../services/Constants';

const Search = () => {
	const [users, setUsers] = useState([]);
	const [usePreviousSort, setUsePreviousSort] = useState(true);
	const [showNotification, setShowNotification] = useState(true);

	const fetchUsers = () => {
		fetch('http://www.mocky.io/v2/5d7f3d17330000204ef0b027?mocky-delay=500ms')
			.then((response) => {
				return response.json();
			})
			.then(({ users }) => {
				setUsers(users);
			});
	};

	useEffect(() => {
		setShowNotification(true);
		setTimeout(() => {
			setShowNotification(false);
		}, 2000);
		fetchUsers();
	}, []);

	useEffect(() => {
		if (localStorage.sortBy && users.length && usePreviousSort) {
			setUsers(handleSortUsers(localStorage.sortBy));
			setUsePreviousSort(false);
		}
	}, [users]);

	const handleChange = (value, type) => {
		if (type === 'radio') {
			return setUsers(handleSortUsers(value));
		}
		if (!value) return fetchUsers();
		if (value.length <= MIN_LENGTH_FOR_SEARCH) return;
		const filteredUsers = users.filter(
			(user) => user.lastname.toLowerCase().indexOf(value) !== -1
		);
		setUsers(filteredUsers);
	};

	const handleSortUsers = (value) => {
		localStorage.sortBy = value;
		const copiedUsers = [...users];
		return copiedUsers.sort((a, b) => {
			if (a[value] < b[value]) {
				return -1;
			}
			if (a[value] > b[value]) {
				return 1;
			}
			return 0;
		});
	};

	const renderUsers = () => {
		return users.map((user, index) => (
			<div className="user-item" key={index}>
				<span>
					{index + 1}. {user.lastname},
				</span>
				{localStorage.adminRole === ADMINS.READONLY_ADMIN && (
					<span className="country-wrap">Country: {user.country}</span>
				)}
				{localStorage.adminRole === ADMINS.CRUD_ADMIN && (
					<>
						<label for="country-wrap" className="country-wrap">
							Country:
						</label>
						<select id="country-wrap" className="country-wrap">
							<option selected={user.country === 'de'} value="de">
								De
							</option>
							<option selected={user.country === 'ru'} value="ru">
								Ru
							</option>
						</select>
					</>
				)}
			</div>
		));
	};

	return (
		<>
			<div className="wrapper">
				<div className="search">
					<Input placeholder="Search" onChange={handleChange} focus />
					<div className="sort-wrap">
						<span>Sort by</span>
						<div>
							<Input
								id="lastname"
								type="radio"
								name="sort"
								value="lastname"
								checked={localStorage.sortBy === 'lastname'}
								onChange={(value) => handleChange(value, 'radio')}
							/>
							<label for="lastname">Last name</label>
						</div>
						<div>
							<Input
								id="country"
								type="radio"
								name="sort"
								value="country"
								checked={localStorage.sortBy === 'country'}
								onChange={(value) => handleChange(value, 'radio')}
							/>
							<label for="country">Country</label>
						</div>
					</div>
					<div>{renderUsers()}</div>
				</div>
			</div>
			{showNotification && (
				<Notification message='Success!' type={NOTIFICATIONS_TYPE.SUCCESS} />
			)}
		</>
	);
};

export default memo(Search);

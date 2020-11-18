import React, { useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({
	focus,
	onChange,
	onKeyDown,
	placeholder,
	type,
	value,
	name,
	classname,
	checked
}) => {
	const inputRef = useRef(null);

	useEffect(() => {
		focus && inputRef.current.focus();
	});

	const handleOnchange = (e) => {
		onChange(e.target.value);
	};

	const handleOnKeyDown = (e) => {
		if (e.key !== 'Enter') return
		onKeyDown();
	};

	return (
		<input
			ref={inputRef}
			className={classNames(type ? `${type}-input` : null, classname)}
			onChange={handleOnchange}
			onKeyDown={handleOnKeyDown}
			placeholder={placeholder}
			type={type}
			name={name}
			value={value}
			checked={checked}
		/>
	);
};

Input.defaultProps = {
	classname: '',
	type: 'text',
	name: '',
	checked: false,
};

Input.propTypes = {
	focus: PropTypes.bool,
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	classname: PropTypes.string,
	checked: PropTypes.bool,
};

export default memo(Input);

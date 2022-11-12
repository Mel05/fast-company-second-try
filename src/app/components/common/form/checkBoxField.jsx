import React from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({ name, value, error, children, handleChange }) => {
	const onHandleChange = () => {
		handleChange({ name: name, value: !value })
	}
	const getInputClasses = () => {
		return 'form-check-input' + (error ? ' is-invalid' : '')
	}

	return (
		<div className='mb-4 form-check'>
			<input
				className={getInputClasses()}
				type='checkbox'
				value=''
				id={name}
				checked={value}
				onChange={onHandleChange}
			/>
			<label className='form-check-label ' htmlFor={name}>
				{children}
			</label>
			{error && <div className='invalid-feedback'>{error}</div>}
		</div>
	)
}

CheckBoxField.propTypes = {
	name: PropTypes.string,
	value: PropTypes.bool,
	error: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	handleChange: PropTypes.func,
}

export default CheckBoxField

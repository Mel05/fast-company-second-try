import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ label, type, name, value, error, handleChange }) => {
	const [showPassword, setShowPassword] = useState(false)
	const getInputClasses = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}
	const toggleShowPassword = () => {
		setShowPassword(prevState => !prevState)
	}

	const onHandleChange = ({ target }) => {
		handleChange({ name: target.name, value: target.value })
	}

	return (
		<div className='mb-4'>
			<label htmlFor={name}> {label} </label>
			<div className='input-group has-validation'>
				<input
					type={showPassword ? 'text' : type}
					id={name}
					name={name}
					value={value}
					onChange={onHandleChange}
					className={getInputClasses()}
				/>

				{type === 'password' && (
					<button
						className={
							!showPassword
								? 'btn btn-outline-primary'
								: 'btn btn-outline-danger'
						}
						type='button'
						onClick={toggleShowPassword}
					>
						{!showPassword ? 'Show' : 'НЕ Show'}
					</button>
				)}
				{error && <div className='invalid-feedback'> {error} </div>}
			</div>
		</div>
	)
}

TextField.defaultProps = {
	type: 'text',
}

TextField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	handleChange: PropTypes.func,
}

export default TextField

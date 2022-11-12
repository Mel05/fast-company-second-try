import React from 'react'
import PropTypes from 'prop-types'

const TextAreaField = ({ label, name, value, error, handleChange }) => {
	const onHandleChange = ({ target }) => {
		handleChange({ name: target.name, value: target.value })
	}

	const getInputClasses = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}

	return (
		<div className='mb-4'>
			<label htmlFor={name}> {label} </label>
			<div className='input-group has-validation'>
				<textarea
					id={name}
					name={name}
					value={value}
					onChange={onHandleChange}
					className={getInputClasses()}
				/>

				{error && <div className='invalid-feedback'> {error} </div>}
			</div>
		</div>
	)
}

TextAreaField.defaultProps = {
	type: 'text',
}

TextAreaField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	handleChange: PropTypes.func,
}

export default TextAreaField

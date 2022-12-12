import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
	label,
	value,
	defaultOptions,
	name,
	options,
	error,
	handleChange,
	handleKeyDown,
}) => {
	const optionsArray =
		!Array.isArray(options) && typeof options === 'object'
			? Object.keys(options).map(optionName => ({
					name: options[optionName].name,
					value: options[optionName]._id,
			  }))
			: options

	const getSelectClasses = () => {
		return 'form-select' + (error ? ' is-invalid' : '')
	}

	const onHandleChange = ({ target }) => {
		handleChange({ name: target.name, value: target.value })
	}

	return (
		<div className='mb-4'>
			<label htmlFor={name} className='form-label'>
				{label}
			</label>
			<select
				className={getSelectClasses()}
				id={name}
				name={name}
				value={value}
				onChange={onHandleChange}
				onKeyDown={handleKeyDown}
			>
				<option disabled value=''>
					{defaultOptions}
				</option>
				{optionsArray &&
					optionsArray.map(option => (
						<option value={option.value} key={option.value}>
							{option.label}
						</option>
					))}
			</select>
			{error && <div className='invalid-feedback'> {error} </div>}
		</div>
	)
}

SelectField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	defaultOptions: PropTypes.string,
	name: PropTypes.string,
	error: PropTypes.string,
	handleChange: PropTypes.func,
	handleKeyDown: PropTypes.func,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default React.memo(SelectField)

import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ label, name, value, options, handleChange }) => {
	const onHandleChange = ({ target }) => {
		handleChange({ name: target.name, value: target.value })
	}

	return (
		<div className='mb-4'>
			<label className='form-label'> {label} </label>
			<div>
				{options.map(option => (
					<div
						key={option.name + '_' + option.value}
						className='form-check form-check-inline'
					>
						<input
							className='form-check-input'
							type='radio'
							name={name}
							id={option.name + '_' + option.value}
							checked={option.value === value}
							value={option.value}
							onChange={onHandleChange}
						/>
						<label
							className='form-check-label'
							htmlFor={option.name + '_' + option.value}
						>
							{option.name}
						</label>
					</div>
				))}
			</div>
		</div>
	)
}

RadioField.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	handleChange: PropTypes.func,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default React.memo(RadioField)

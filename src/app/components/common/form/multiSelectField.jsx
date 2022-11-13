import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ({
	label,
	name,
	defaultValue,
	options,
	handleChange,
}) => {
	const optionsArray =
		!Array.isArray(options) && typeof options === 'object'
			? Object.keys(options).map(optionName => ({
					label: options[optionName].name,
					value: options[optionName]._id,
			  }))
			: options

	const onHandleChange = value => {
		handleChange({ name: name, value })
	}

	return (
		<div className='mb-4'>
			<label className='form-label'>{label}</label>
			<Select
				className='basic-multi-select'
				classNamePrefix='select'
				isMulti
				closeMenuOnSelect={false}
				name={name}
				defaultValue={defaultValue}
				options={optionsArray}
				onChange={onHandleChange}
			/>
		</div>
	)
}

MultiSelectField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	defaultValue: PropTypes.array,
	handleChange: PropTypes.func,
	options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default React.memo(MultiSelectField)

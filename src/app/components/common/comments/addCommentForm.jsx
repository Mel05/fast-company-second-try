import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'

import TextAreaField from '../form/textAreaField'

const AddCommentForm = ({ handleSubmit }) => {
	const [data, setData] = useState({})
	const [errors, setErrors] = useState({})

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validateScheme = yup.object().shape({
		content: yup.string().required('Сообщение не может быть пустым'),
	})

	const validate = () => {
		validateScheme
			.validate(data)
			.then(() => setErrors({}))
			.catch(err => setErrors({ [err.path]: err.message }))
		return Object.keys(errors).length === 0
	}

	const clearForm = () => {
		setData({})
		setErrors({})
	}

	const onHandleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		handleSubmit(data)
		clearForm()
	}

	return (
		<div>
			<h2>New comment</h2>
			<form onSubmit={onHandleSubmit}>
				<TextAreaField
					label='Сообщение'
					name='content'
					value={data.content || ''}
					error={errors.content}
					handleChange={handleChange}
				/>
				<div className='d-flex justify-content-end'>
					<button className='btn btn-primary'> Опубликовать </button>
				</div>
			</form>
		</div>
	)
}

AddCommentForm.propTypes = {
	onSubmit: PropTypes.func,
}

export default AddCommentForm

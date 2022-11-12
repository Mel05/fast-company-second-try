import React, { useState, useEffect } from 'react'
import api from '../../../api'
import PropTypes from 'prop-types'
import * as yup from 'yup'

import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'

const initialDate = { userId: '', content: '' }

const AddCommentForm = ({ handleSubmit }) => {
	const [data, setData] = useState(initialDate)
	const [users, setUsers] = useState({})
	const [errors, setErrors] = useState({})

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validateScheme = yup.object().shape({
		content: yup.string().required('Сообщение не может быть пустым'),
		userId: yup
			.string()
			.required('Выберите от чьего имени вы хотите отправить сообщение'),
	})

	const validate = () => {
		validateScheme
			.validate(data)
			.then(() => setErrors({}))
			.catch(err => setErrors({ [err.path]: err.message }))
		return Object.keys(errors).length === 0
	}

	useEffect(() => {
		api.users.fetchAll().then(setUsers)
	}, [])

	const clearForm = () => {
		setData(initialDate)
		setErrors({})
	}

	const onHandleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		handleSubmit(data)
		clearForm()
	}

	const arrayOfUsers =
		users &&
		Object.keys(users).map(userId => ({
			name: users[userId].name,
			value: users[userId]._id,
		}))

	return (
		<div>
			<h2>New comment</h2>
			<form onSubmit={onHandleSubmit}>
				<SelectField
					name='userId'
					value={data.userId}
					defaultOptions='Выберите пользователя'
					options={arrayOfUsers}
					error={errors.userId}
					handleChange={handleChange}
				/>
				<TextAreaField
					label='Сообщение'
					name='content'
					value={data.content}
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

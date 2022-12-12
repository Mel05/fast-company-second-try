import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthErrors, login } from '../../store/users'

const LoginForm = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({ email: '', password: '', stayOn: false })
	const loginError = useSelector(getAuthErrors())
	const dispatch = useDispatch()
	const [errors, setErrors] = useState({})

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validateScheme = yup.object().shape({
		password: yup.string().required('Пароль обязателен для заполнения'),
		email: yup
			.string()
			.required('Электронная почта обязательна для заполнения'),
	})

	useEffect(() => {
		validate()
	}, [data])

	const validate = () => {
		validateScheme
			.validate(data)
			.then(() => setErrors({}))
			.catch(err => setErrors({ [err.path]: err.message }))
		return Object.keys(errors).length === 0
	}
	const isValid = Object.keys(errors).length === 0

	const handleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		dispatch(login({ payload: data }))

		if (!loginError) return
		navigate('/')
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label='Электронная почта'
				name='email'
				value={data.email}
				error={errors.email}
				handleChange={handleChange}
			/>
			<TextField
				label='Пароль'
				type='password'
				name='password'
				value={data.password}
				error={errors.password}
				handleChange={handleChange}
			/>
			<CheckBoxField
				name='stayOn'
				value={data.stayOn}
				handleChange={handleChange}
			>
				Оставаться в системе
			</CheckBoxField>

			{loginError && <p className='text-danger'> {loginError} </p>}
			<button
				type='submit'
				className='btn btn-primary w-100 mx-auto mb-4'
				disabled={!isValid}
			>
				Submit
			</button>
		</form>
	)
}

export default LoginForm

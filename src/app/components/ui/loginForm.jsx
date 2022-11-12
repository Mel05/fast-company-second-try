import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'

const LoginForm = () => {
	const [data, setData] = useState({ email: '', password: '', stayOn: false })
	const [errors, setErrors] = useState({})

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validateScheme = yup.object().shape({
		password: yup
			.string()
			.required('Пароль обязателен для заполнения')
			.matches(
				/(?=.*[A-Z])/,
				'Пароль должен содержать хотябы одну заглавную букву'
			)
			.matches(/(?=.*[0-9])/, 'Пароль должен содержать хотябы одно число')
			.matches(
				/(?=.*[!@#$%^&*])/,
				'Пароль должен содержать один из специальных символов !@#$%^&*'
			)
			.matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
		email: yup
			.string()
			.required('Электронная почта обязательна для заполнения')
			.email('Email введен не коректно'),
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
		console.log(data)
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

import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({ email: '', password: '', stayOn: false })
	const { logIn } = useAuth()
	const [errors, setErrors] = useState({})
	const [enterError, setEnterError] = useState(null)

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
		setEnterError(null)
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

	const handleSubmit = async e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		console.log(data)
		try {
			await logIn(data)
			navigate('/')
		} catch (error) {
			setEnterError(error.message)
		}
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

			{enterError && <p className='text-danger'> {enterError} </p>}
			<button
				type='submit'
				className='btn btn-primary w-100 mx-auto mb-4'
				disabled={!isValid || enterError}
			>
				Submit
			</button>
		</form>
	)
}

export default LoginForm

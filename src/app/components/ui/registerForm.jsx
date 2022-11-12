import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as yup from 'yup'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		licence: false,
	})
	const [professions, setProfessions] = useState()
	const [qualities, setQualities] = useState({})
	const [errors, setErrors] = useState({})

	useEffect(() => {
		api.professions.fetchAll().then(data => setProfessions(data))
		api.qualities.fetchAll().then(data => setQualities(data))
	}, [])

	const validateScheme = yup.object().shape({
		licence: yup
			.string()
			.required(
				'Вы не можете использовать наш сервис без подтреврждения лицензионного соглашения'
			),

		profession: yup.string().required('Обязательно выберите вашу проффесию'),

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

	// const validatorConfig = {
	// 	email: {
	// 		isRequired: {
	// 			message: 'Электронная почта обязательна для заполнения',
	// 		},
	// 		isEmail: {
	// 			message: 'Email введен не коректно',
	// 		},
	// 	},
	// 	password: {
	// 		isRequired: {
	// 			message: 'Пароль обязателен для заполнения',
	// 		},
	// 		isCapitalSymbol: {
	// 			message: 'Пароль должен содержать хотябы одну заглавную букву',
	// 		},
	// 		isContainDigit: {
	// 			message: 'Пароль должен содержать хотябы одно число',
	// 		},
	// 		min: {
	// 			message: 'Пароль должен состоять минимум из 8 символов',
	// 			value: 8,
	// 		},
	// 	},
	// 	profession: {
	// 		isRequired: {
	// 			message: 'Обязательно выберите вашу проффесию',
	// 		},
	// 	},
	// 	licence: {
	// 		isRequired: {
	// 			message:
	// 				'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения',
	// 		},
	// 	},
	// }

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

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

			<SelectField
				label='Выберите свою профессию'
				defaultOptions='Выберите...'
				name='profession'
				value={data.profession}
				options={professions}
				error={errors.profession}
				handleChange={handleChange}
			/>
			<RadioField
				label='Выберите ваш пол'
				options={[
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Other', value: 'other' },
				]}
				value={data.sex}
				name='sex'
				handleChange={handleChange}
			/>
			<MultiSelectField
				label='Выберите ваши качества'
				name='qualities'
				defaultValue={data.qualities}
				options={qualities}
				handleChange={handleChange}
			/>
			<CheckBoxField
				name='licence'
				value={data.licence}
				error={errors.licence}
				handleChange={handleChange}
			>
				Подтвердить лицензионное соглашение
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

export default RegisterForm

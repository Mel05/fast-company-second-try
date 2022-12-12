import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities } from '../../store/qualities'
import { signUp } from '../../store/users'
import { useNavigate } from 'react-router-dom'
import { getProfessions } from '../../store/professions'

const RegisterForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		licence: false,
	})

	const professions = useSelector(getProfessions())
	const qualities = useSelector(getQualities())
	const professionsList = professions.map(p => ({
		label: p.name,
		value: p._id,
	}))
	const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))

	const [errors, setErrors] = useState({})

	const validateScheme = yup.object().shape({
		licence: yup
			.string()
			.required(
				'Вы не можете использовать наш сервис без подтреврждения лицензионного соглашения'
			),

		profession: yup.string().required('Обязательно выберите вашу проффесию'),

		name: yup
			.string()
			.required('Имя обязательно для заполнения')
			.matches(/(?=.{3,})/, 'Имя должно состоять минимум из 3 символов'),

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
		const newData = { ...data, qualities: data.qualities.map(q => q.value) }

		dispatch(signUp(newData))
		navigate('/users')
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

			<TextField
				label='Имя'
				name='name'
				value={data.name}
				error={errors.name}
				handleChange={handleChange}
			/>

			<SelectField
				label='Выберите свою профессию'
				defaultOptions='Выберите...'
				name='profession'
				value={data.profession}
				options={professionsList}
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
				options={qualitiesList}
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

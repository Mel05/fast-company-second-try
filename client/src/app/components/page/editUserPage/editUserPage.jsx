import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackButton from '../../common/backButton'
import { useDispatch, useSelector } from 'react-redux'
import {
	getQualities,
	getQualitiesLoadingStatus,
} from '../../../store/qualities'
import {
	getProfessions,
	getProfessionsLoadingStatus,
} from '../../../store/professions'
import { getCurrentUserData, updateUser } from '../../../store/users'

const EditUserPage = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState()
	const currentUser = useSelector(getCurrentUserData())
	const dispatch = useDispatch()
	const [errors, setErrors] = useState({})

	const professions = useSelector(getProfessions())
	const profLoading = useSelector(getProfessionsLoadingStatus())
	const qualities = useSelector(getQualities())
	const qualLoading = useSelector(getQualitiesLoadingStatus())

	const professionsList = professions.map(p => ({
		label: p.name,
		value: p._id,
	}))
	const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))

	const handleSubmit = e => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		dispatch(
			updateUser({
				...data,
				qualities: data.qualities.map(q => q.value),
			})
		)
		navigate(`/users/${currentUser._id}`)
	}

	function getQualitiesListById(qualitiesIds) {
		const qualitiesArray = []
		for (const qualId of qualitiesIds) {
			for (const quality of qualities) {
				if (quality._id === qualId) {
					qualitiesArray.push(quality)
					break
				}
			}
		}
		return qualitiesArray
	}

	const transformData = data => {
		return getQualitiesListById(data).map(qual => ({
			label: qual.name,
			value: qual._id,
		}))
	}

	useEffect(() => {
		if (!profLoading && !qualLoading && currentUser && !data) {
			setData({
				...currentUser,
				qualities: transformData(currentUser.qualities),
			})
		}
	}, [profLoading, qualLoading, currentUser, data])

	useEffect(() => {
		if (data && isLoading) {
			setIsLoading(false)
		}
	}, [data])

	const validateScheme = yup.object().shape({
		profession: yup.string().required('Обязательно выберите вашу проффесию'),

		email: yup
			.string()
			.required('Электронная почта обязательна для заполнения')
			.email('Email введен не коректно'),

		name: yup.string().required('Введите ваше имя'),
	})

	useEffect(() => {
		validate()
	}, [data])

	const handleChange = target => {
		setData(prevState => ({
			...prevState,
			[target.name]: target.value,
		}))
	}

	const validate = () => {
		validateScheme
			.validate(data)
			.then(() => setErrors({}))
			.catch(err => setErrors({ [err.path]: err.message }))
		return Object.keys(errors).length === 0
	}

	const isValid = Object.keys(errors).length === 0

	return (
		<div className='container mt-5'>
			<BackButton />
			<div className='row'>
				<div className='col-md-6 offset-md-3 shadow p-4'>
					{!isLoading && Object.keys(professions).length > 0 ? (
						<form onSubmit={handleSubmit}>
							<TextField
								label='Имя'
								name='name'
								value={data.name}
								handleChange={handleChange}
								error={errors.name}
								autoFocus
							/>
							<TextField
								label='Электронная почта'
								name='email'
								value={data.email}
								handleChange={handleChange}
								error={errors.email}
							/>
							<SelectField
								label='Выберите свою профессию'
								defaultOptions='Выберите...'
								name='profession'
								options={professionsList}
								handleChange={handleChange}
								value={data.profession}
								error={errors.profession}
							/>

							<RadioField
								label='Выберите ваш пол'
								options={[
									{ name: 'Male', value: 'male' },
									{ name: 'Female', value: 'female' },
									{ name: 'Other', value: 'other' },
								]}
								name='sex'
								value={data.sex}
								handleChange={handleChange}
							/>
							<MultiSelectField
								label='Выберите ваши качества'
								name='qualities'
								defaultValue={data.qualities}
								options={qualitiesList}
								handleChange={handleChange}
							/>

							<button
								type='submit'
								disabled={!isValid}
								className='btn btn-primary w-100 mx-auto mb-4'
							>
								Обновить
							</button>
						</form>
					) : (
						'Loading...'
					)}
				</div>
			</div>
		</div>
	)
}

export default EditUserPage

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../api'
import * as yup from 'yup'
import FormComponent, {
	TextField,
	SelectField,
	RadioField,
	MultiSelectField,
} from '../../common/form'

import BackButton from '../../common/backButton'

const EditUserPage = () => {
	const { userId } = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
	})
	const [professions, setProfessions] = useState([])
	const [qualities, setQualities] = useState({})

	const getProfessionsById = id => {
		for (const prof in professions) {
			const profData = professions[prof]
			if (profData._id === id) return profData
		}
	}

	const getQualities = elements => {
		const qualitiesArray = []
		for (const elem of elements) {
			for (const qualy in qualities) {
				if (elem.value === qualities[qualy]._id) {
					qualitiesArray.push(qualities[qualy])
				}
			}
		}
		return qualitiesArray
	}

	const handleSubmit = data => {
		const { profession, qualities } = data
		api.users
			.update(userId, {
				...data,
				profession: getProfessionsById(profession),
				qualities: getQualities(qualities),
			})
			.then(data => navigate(`/users/${data._id}`))
	}

	const transformData = data => {
		return data.map(qual => ({ label: qual.name, value: qual._id }))
	}

	useEffect(() => {
		setIsLoading(true)
		api.users.getById(userId).then(({ profession, qualities, ...data }) =>
			setData(prevState => ({
				...prevState,
				...data,
				qualities: transformData(qualities),
				profession: profession._id,
			}))
		)
		api.qualities.fetchAll().then(data => setQualities(data))
		api.professions.fetchAll().then(data => setProfessions(data))
	}, [])

	useEffect(() => {
		if (data._id) setIsLoading(false)
	}, [data])

	const validateScheme = yup.object().shape({
		profession: yup.string().required('Обязательно выберите вашу проффесию'),

		email: yup
			.string()
			.required('Электронная почта обязательна для заполнения')
			.email('Email введен не коректно'),

		name: yup.string().required('Введите ваше имя'),
	})

	return (
		<div className='container mt-5'>
			<BackButton />
			<div className='row'>
				<div className='col-md-6 offset-md-3 shadow p-4'>
					{!isLoading && Object.keys(professions).length > 0 ? (
						<FormComponent
							handleSubmit={handleSubmit}
							validateScheme={validateScheme}
							defaultData={data}
						>
							<TextField label='Имя' name='name' autoFocus />
							<TextField label='Электронная почта' name='email' />
							<SelectField
								label='Выберите свою профессию'
								defaultOptions='Выберите...'
								name='profession'
								options={professions}
							/>

							<RadioField
								label='Выберите ваш пол'
								options={[
									{ name: 'Male', value: 'male' },
									{ name: 'Female', value: 'female' },
									{ name: 'Other', value: 'other' },
								]}
								name='sex'
							/>
							<MultiSelectField
								label='Выберите ваши качества'
								name='qualities'
								defaultValue={data.qualities}
								options={qualities}
							/>

							<button
								type='submit'
								className='btn btn-primary w-100 mx-auto mb-4'
							>
								Обновить
							</button>
						</FormComponent>
					) : (
						'Loading...'
					)}
				</div>
			</div>
		</div>
	)
}

export default EditUserPage

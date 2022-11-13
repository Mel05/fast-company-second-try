import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../common/backButton'

const UserCard = ({ user }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = () => {
		navigate(location.pathname + '/edit')
	}

	return (
		<div className='card mb-3'>
			<div className='card-body'>
				<BackButton />
				<button
					className='position-absolute top-0 end-0 btn btn-light btn-sm'
					onClick={handleClick}
				>
					<i className='bi bi-gear'> EDIT </i>
				</button>
				<div className='d-flex flex-column align-items-center text-center position-relative'>
					<img
						src={`https://avatars.dicebear.com/api/avataaars/${(
							Math.random() + 1
						)
							.toString(36)
							.substring(7)}.svg`}
						className='rounded-circle'
						width='150'
					/>
					<div className='mt-3'>
						<h4> {user.name} </h4>
						<p className='text-secondary mb-1'> {user.profession.name}</p>
						<div className='text-muted'>
							<span className='badge bg-primary' role='button'>
								&dArr;
							</span>{' '}
							<span className='badge bg-secondary' role='button'>
								&uArr;
							</span>
							<span className='ms-2'> {user.rate} </span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

UserCard.propTypes = {
	user: PropTypes.object,
}

export default UserCard

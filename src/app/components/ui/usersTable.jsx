import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookMark from '../common/bookmark'
import Qualities from '../ui/qualities'
import Table from '../common/table'

const UsersTable = ({ handleToggleBookMark, handleDelete, ...rest }) => {
	const columns = {
		name: {
			path: 'name',
			name: 'Имя',
			component: user => <Link to={`/users/${user._id}`}> {user.name} </Link>,
		},
		qualities: {
			name: 'Качества',
			component: user => <Qualities qualities={user.qualities} />,
		},
		professions: { path: 'profession.name', name: 'Профессия' },
		completedMeetings: { path: 'completedMeetings', name: 'Встреч' },
		rate: { path: 'rate', name: 'Оценка' },
		bookmark: {
			path: 'bookmark',
			name: 'Избранное',
			component: user => (
				<BookMark
					status={user.bookmark}
					id={user._id}
					handleToggleBookMark={handleToggleBookMark}
				/>
			),
		},
		delete: {
			component: user => (
				<button
					className={'btn btn-sm btn-danger'}
					onClick={() => handleDelete(user._id)}
				>
					Удалить
				</button>
			),
		},
	}

	return <Table columns={columns} {...rest} />
}

UsersTable.propTypes = {
	handleToggleBookMark: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
}

export default UsersTable

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookMark from '../common/bookmark'
import Qualities from '../ui/qualities'
import Table from '../common/table'
import Profession from './profession'

const UsersTable = ({ handleToggleBookMark, ...rest }) => {
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
		professions: {
			name: 'Профессия',
			component: user => <Profession id={user.profession} />,
		},
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
	}

	return <Table columns={columns} {...rest} />
}

UsersTable.propTypes = {
	handleToggleBookMark: PropTypes.func.isRequired,
}

export default UsersTable

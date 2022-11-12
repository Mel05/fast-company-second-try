import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = ({
	_id,
	name,
	qualities,
	profession,
	completedMeetings,
	rate,
	bookmark,
	handleDelete,
	handleToggleBookMark,
}) => {
	console.log(_id)
	return (
		<tr>
			<td> {name} </td>
			<td>
				{qualities.map(qual => (
					<Qualitie key={qual._id} {...qual} />
				))}
			</td>
			<td>{profession.name}</td>
			<td>{completedMeetings}</td>
			<td>{rate}</td>
			<td>
				<BookMark
					status={bookmark}
					id={_id}
					handleToggleBookMark={handleToggleBookMark}
				/>
			</td>
			<td>
				<button
					className={'btn btn-sm btn-danger'}
					onClick={() => handleDelete(_id)}
				>
					Удалить
				</button>
			</td>
		</tr>
	)
}

User.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	qualities: PropTypes.array.isRequired,
	profession: PropTypes.object.isRequired,
	completedMeetings: PropTypes.number.isRequired,
	rate: PropTypes.number.isRequired,
	bookmark: PropTypes.bool.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleToggleBookMark: PropTypes.func.isRequired,
}

export default User

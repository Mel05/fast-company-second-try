import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ id, status, handleToggleBookMark }) => {
	const getMarkStatus = status => {
		return status === false ? 'warning' : 'success'
	}
	const getPhrase = status => {
		return status === false ? 'False' : 'True'
	}

	return (
		<span
			className={'badge bg-' + getMarkStatus(status)}
			role={'button'}
			onClick={() => handleToggleBookMark(id)}
		>
			{getPhrase(status)}
		</span>
	)
}

BookMark.propTypes = {
	id: PropTypes.string.isRequired,
	// status: PropTypes.bool.isRequired,
	handleToggleBookMark: PropTypes.func.isRequired,
}

export default BookMark

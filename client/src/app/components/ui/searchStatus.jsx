import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ totalNumUsers, renderPhrase }) => {
	return (
		<h2>
			<span className={totalNumUsers ? 'badge bg-primary' : 'badge bg-danger'}>
				{renderPhrase(totalNumUsers)}
			</span>
		</h2>
	)
}

SearchStatus.propTypes = {
	totalNumUsers: PropTypes.number.isRequired,
	renderPhrase: PropTypes.func.isRequired,
}

export default SearchStatus

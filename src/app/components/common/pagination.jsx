import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({
	totalNumUsers,
	usersOnPage,
	currentPage,
	handlePageChange,
}) => {
	const numOfPages = Math.ceil(totalNumUsers / usersOnPage)
	const pages = _.range(1, numOfPages + 1)

	if (numOfPages === 1 || numOfPages === 0) return null
	return (
		<nav aria-label='Page navigation example'>
			<ul className='pagination'>
				<li className='page-item'>
					<a className='page-link' aria-label='Previous'>
						<span
							aria-hidden='true'
							onClick={() => handlePageChange(currentPage - 1)}
						>
							&laquo;
						</span>
					</a>
				</li>
				{pages.map(page => (
					<li
						key={page}
						className={'page-item ' + (page === currentPage ? 'active' : '')}
					>
						<span
							className={'page-link'}
							onClick={() => handlePageChange(page)}
						>
							{page}
						</span>
					</li>
				))}

				<li className='page-item'>
					<a className='page-link' aria-label='Next'>
						<span
							aria-hidden='true'
							onClick={() => handlePageChange(currentPage + 1)}
						>
							&raquo;
						</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}

Pagination.propTypes = {
	totalNumUsers: PropTypes.number.isRequired,
	usersOnPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	handlePageChange: PropTypes.func.isRequired,
}

export default Pagination

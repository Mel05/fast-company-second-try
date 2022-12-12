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
					<button
						hidden={currentPage === 1}
						className='page-link'
						aria-label='Previous'
						aria-hidden='true'
						onClick={() => handlePageChange(currentPage - 1)}
					>
						&laquo;
					</button>
				</li>
				{pages.map(page => (
					<li
						key={page}
						className={'page-item ' + (page === currentPage ? 'active' : '')}
					>
						<span
							role={'button'}
							className={'page-link'}
							onClick={() => handlePageChange(page)}
						>
							{page}
						</span>
					</li>
				))}

				<li className='page-item'>
					<button
						hidden={numOfPages <= currentPage}
						className='page-link'
						aria-label='Next'
						aria-hidden='true'
						onClick={() => handlePageChange(currentPage + 1)}
					>
						&raquo;
					</button>
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

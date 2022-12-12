import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ selectedSort, onSort, columns }) => {
	const handleSort = item => {
		if (selectedSort.path === item) {
			onSort({
				...selectedSort,
				order: selectedSort.order === 'asc' ? 'desc' : 'asc',
			})
		} else {
			onSort({ path: item, order: 'asc' })
		}
	}

	const renderSortArrow = (selectedSort, currentPath) => {
		if (selectedSort.path === currentPath) {
			if (selectedSort.order === 'asc') {
				return <span className='badge bg-primary m-1'> &dArr; </span>
			} else {
				return <span className='badge bg-secondary m-1'> &uArr; </span>
			}
		}
		return null
	}

	return (
		<thead>
			<tr>
				{Object.keys(columns).map(column => (
					<th
						key={column}
						onClick={
							columns[column].path
								? () => handleSort(columns[column].path)
								: undefined
						}
						{...{ role: columns[column].path && 'button' }}
						scope='col'
					>
						{columns[column].name}
						{renderSortArrow(selectedSort, columns[column].path)}
					</th>
				))}
			</tr>
		</thead>
	)
}

TableHeader.propTypes = {
	selectedSort: PropTypes.object.isRequired,
	onSort: PropTypes.func.isRequired,
	columns: PropTypes.object.isRequired,
}

export default TableHeader

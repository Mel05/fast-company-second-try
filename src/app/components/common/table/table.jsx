import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from './tableHeader'
import TableBody from './tableBody'

const Table = ({ columns, ...rest }) => {
	return (
		<table className='table'>
			<TableHeader columns={columns} {...rest} />
			<TableBody columns={columns} {...rest} />
		</table>
	)
}

Table.propTypes = {
	columns: PropTypes.object.isRequired,
}

export default Table

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TableBody = ({ newUsers, columns }) => {
	const renderContent = (item, column) => {
		if (columns[column].component) {
			const component = columns[column].component
			if (typeof component === 'function') {
				return component(item)
			}
			return component
		}
		return _.get(item, columns[column].path)
	}

	return (
		<tbody>
			{newUsers.map(user => (
				<tr key={user._id}>
					{Object.keys(columns).map(column => (
						<td key={column}> {renderContent(user, column)}</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

TableBody.propTypes = {
	newUsers: PropTypes.array.isRequired,
	columns: PropTypes.object.isRequired,
}

export default TableBody

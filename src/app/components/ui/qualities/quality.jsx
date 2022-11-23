import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

const Quality = ({ id }) => {
	const { getQualities, isLoading: qualLoading } = useQualities()

	if (!qualLoading) {
		const { _id, color, name } = getQualities(id)

		return (
			<span className={'badge m-1 bg-' + color} key={_id}>
				{name}
			</span>
		)
	} else {
		return <h1> 'Loading ...' </h1>
	}
}

Quality.propTypes = {
	id: PropTypes.string.isRequired,
}

export default Quality

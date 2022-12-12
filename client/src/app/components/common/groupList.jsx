import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ({
	professions,
	selectedProf,
	valueProperty,
	contentProperty,
	handleProfessionsSelect,
}) => {
	if (!Array.isArray(professions)) {
		return (
			<ul className='list-group'>
				{Object.keys(professions).map(prof => (
					<li
						key={professions[prof][valueProperty]}
						className={
							'list-group-item' +
							(professions[prof] === selectedProf ? ' active' : '')
						}
						onClick={() => handleProfessionsSelect(professions[prof])}
						role={'button'}
					>
						{professions[prof][contentProperty]}
					</li>
				))}
			</ul>
		)
	}
	return (
		<ul className='list-group'>
			{Object.keys(professions).map(prof => (
				<li
					key={professions[prof][valueProperty]}
					className={
						'list-group-item' +
						(professions[prof] === selectedProf ? ' active' : '')
					}
					role={'button'}
					onClick={() => handleProfessionsSelect(professions[prof])}
				>
					{professions[prof][contentProperty]}
				</li>
			))}
		</ul>
	)
}

GroupList.defaultProps = {
	valueProperty: '_id',
	contentProperty: 'name',
}

GroupList.propTypes = {
	professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
		.isRequired,
	selectedProf: PropTypes.object,
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	handleProfessionsSelect: PropTypes.func.isRequired,
}

export default GroupList

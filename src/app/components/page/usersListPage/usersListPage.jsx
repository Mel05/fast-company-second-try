import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import api from '../../../api'
import _ from 'lodash'
import { paginate } from '../../../utils/paginate'
//import Table from '../../common/table/index.js'
import SearchStatus from '../../ui/searchStatus'
import GroupList from '../../common/groupList'
import Pagination from '../../common/pagination'
import UsersTable from '../../ui/usersTable'

const UsersListPage = () => {
	const [users, setUsers] = useState()
	useEffect(() => {
		api.users.fetchAll().then(data => setUsers(data))
	}, [])

	const [professions, setProfessions] = useState()
	useEffect(() => {
		api.professions.fetchAll().then(data => setProfessions(data))
	}, [])

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedProf, setSelectedProf] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

	const usersOnPage = 4

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf, searchQuery])

	const handleSearchQuery = ({ target }) => {
		setSelectedProf(undefined)
		setSearchQuery(target.value)
	}

	const handleProfessionsSelect = prof => {
		if (searchQuery !== '') setSearchQuery('')
		setSelectedProf(prof)
	}
	const clearSelectedProfessions = () => {
		setSelectedProf()
	}

	const handleSort = item => {
		setSortBy(item)
	}

	const handlePageChange = page => {
		setCurrentPage(page)
	}
	const handleDelete = id => {
		setUsers(users.filter(user => user._id !== id))
	}
	const handleToggleBookMark = id => {
		setUsers(
			users.map(user => {
				if (user._id === id) {
					return { ...user, bookmark: !user.bookmark }
				}
				return user
			})
		)
	}
	const renderPhrase = num => {
		if (num > 4 && num < 15) return `${num} Человек тусанет с тобой`
		if (num > 1 && num < 5) return `${num} Человека тусанут с тобой`
		if (num === 1) return `${num} Человек тусанет с тобой`
		return 'Никто с тобой не тусанет'
	}

	if (users) {
		const filteredUsers = searchQuery
			? users.filter(
					user =>
						user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
			  )
			: selectedProf
			? users.filter(
					user =>
						JSON.stringify(user.profession) === JSON.stringify(selectedProf)
			  )
			: users
		const totalNumUsers = filteredUsers.length
		const sortUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
		const newUsers = paginate(sortUsers, currentPage, usersOnPage)

		return (
			<>
				<div className='d-flex'>
					{!!professions && (
						<div className='d-flex flex-column flex-shrink-0 p-3'>
							<GroupList
								professions={professions}
								selectedProf={selectedProf}
								handleProfessionsSelect={handleProfessionsSelect}
							/>
							<button
								className={'btn m-2 btn-sm btn-primary'}
								onClick={clearSelectedProfessions}
							>
								Очистить
							</button>
						</div>
					)}
					<div className='d-flex flex-column'>
						<div className='d-flex flex-column'>
							<SearchStatus
								totalNumUsers={totalNumUsers}
								renderPhrase={renderPhrase}
							/>
							<input
								type='text'
								name='searchQuery'
								placeholder='Search ...'
								onChange={handleSearchQuery}
								value={searchQuery}
							/>
						</div>
						<div className='d-flex flex-column'>
							<UsersTable
								onSort={handleSort}
								selectedSort={sortBy}
								totalNumUsers={totalNumUsers}
								newUsers={newUsers}
								handleDelete={handleDelete}
								handleToggleBookMark={handleToggleBookMark}
							/>
						</div>
						<div className='d-flex justify-content-center'>
							<Pagination
								totalNumUsers={totalNumUsers}
								usersOnPage={usersOnPage}
								currentPage={currentPage}
								handlePageChange={handlePageChange}
							/>
						</div>
					</div>
				</div>
			</>
		)
	}
	return <h2 className='m-2'>Loading...</h2>
}

// UsersList.propTypes = {
// 	newUsers: PropTypes.array.isRequired,
// 	totalNumUsers: PropTypes.number.isRequired,
// 	currentPage: PropTypes.number.isRequired,
// 	usersOnPage: PropTypes.number.isRequired,
// }

export default UsersListPage

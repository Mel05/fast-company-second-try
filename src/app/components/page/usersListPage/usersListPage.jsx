import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { paginate } from '../../../utils/paginate'

import SearchStatus from '../../ui/searchStatus'
import GroupList from '../../common/groupList'
import Pagination from '../../common/pagination'
import UsersTable from '../../ui/usersTable'

import { useSelector } from 'react-redux'
import { getCurrentUserId, getUsersList } from '../../../store/users'
import {
	getProfessions,
	getProfessionsLoadingStatus,
} from '../../../store/professions'

const UsersListPage = () => {
	const users = useSelector(getUsersList())
	const currentUserId = useSelector(getCurrentUserId())
	const professions = useSelector(getProfessions())
	const profLoading = useSelector(getProfessionsLoadingStatus())

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedProf, setSelectedProf] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

	const usersOnPage = 4

	const handleDelete = id => {
		//setUsers(users.filter(user => user._id !== id))
		console.log(id)
	}

	const handleToggleBookMark = id => {
		const newArray = users.map(user => {
			if (user._id === id) {
				return { ...user, bookmark: !user.bookmark }
			}
			return user
		})
		//setUsers(newArray)
		console.log(newArray)
	}

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf, searchQuery])

	const handleProfessionsSelect = prof => {
		if (searchQuery !== '') setSearchQuery('')
		setSelectedProf(prof)
	}

	const handleSearchQuery = ({ target }) => {
		setSelectedProf(undefined)
		setSearchQuery(target.value)
	}

	const handlePageChange = page => {
		setCurrentPage(page)
	}

	const handleSort = item => {
		setSortBy(item)
	}

	const renderPhrase = num => {
		if (num > 4 && num < 15) return `${num} Человек тусанет с тобой`
		if (num > 1 && num < 5) return `${num} Человека тусанут с тобой`
		if (num === 1) return `${num} Человек тусанет с тобой`
		return 'Никто с тобой не тусанет'
	}

	function filterUsers(users) {
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
		return filteredUsers.filter(u => u._id !== currentUserId)
	}

	const filteredUsers = filterUsers(users)
	const totalNumUsers = filteredUsers.length
	const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
	const newUsers = paginate(sortedUsers, currentPage, usersOnPage)

	if (newUsers.length === 0 && totalNumUsers !== 0) {
		setCurrentPage(currentPage - 1)
	}

	const clearSelectedProfessions = () => {
		setSelectedProf()
	}

	return (
		<div className='d-flex'>
			{professions && !profLoading && (
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
	)
}

UsersListPage.propTypes = {
	users: PropTypes.array,
}

export default UsersListPage

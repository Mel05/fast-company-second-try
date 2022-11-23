import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useAuth } from '../hooks/useAuth'
import UsersProvider from '../hooks/useUsers'

const Users = () => {
	const params = useParams()
	const { userId, edit } = params
	const { currentUser } = useAuth()

	return (
		<>
			<UsersProvider>
				{userId ? (
					edit ? (
						userId === currentUser._id ? (
							<EditUserPage />
						) : (
							<Navigate to={`/users/${currentUser._id}/edit`} />
						)
					) : (
						<UserPage userId={userId} />
					)
				) : (
					<UsersListPage />
				)}
			</UsersProvider>
		</>
	)
}

export default Users

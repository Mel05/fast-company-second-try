import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ children }) => {
	const isLoggedIn = useSelector(getIsLoggedIn())

	if (!isLoggedIn) {
		return <Navigate to='/login' />
	}
	return children
}

ProtectedRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
}

export default ProtectedRoute

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import LogOut from './layouts/logOut'
import ProtectedRoute from './components/common/protectedRoute'
import AppLoader from './components/ui/hoc/appLoader'

function App() {
	return (
		<div>
			<AppLoader>
				<NavBar />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='users/' element={<Users />} />
					<Route path='users/:userId' element={<Users />} />
					<Route
						path='users/:userId/:edit'
						element={
							<ProtectedRoute>
								<Users />
							</ProtectedRoute>
						}
					/>

					<Route path='login/' element={<Login />} />
					<Route path='login/:type' element={<Login />} />

					<Route path='logout/' element={<LogOut />} />

					<Route path='*' element={<Main />} />
				</Routes>
			</AppLoader>
			<ToastContainer />
		</div>
	)
}

export default App

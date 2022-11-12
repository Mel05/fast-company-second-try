import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'

function App() {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path='/users/' element={<Users />} />
				<Route path='/users/:userId' element={<Users />} />
				<Route path='/users/:userId/:edit' element={<Users />} />

				<Route path='/login/' element={<Login />} />
				<Route path='/login/:type' element={<Login />} />

				<Route path='/' element={<Main />} />
				<Route path='*' element={<Main />} />
			</Routes>
		</div>
	)
}

export default App

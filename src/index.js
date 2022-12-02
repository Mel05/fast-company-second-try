import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.css'
import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from './app/store/createStore'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore()

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)

reportWebVitals()

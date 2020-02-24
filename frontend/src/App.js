import React from 'react'

// Style
import './App.css'
import logo from './assets/logoWeb.svg'

// Route
import Routes from './routes'

export default function App() {
	return (
		<div className='container'>
			<img src={logo} alt='Aircnc' />

			<Routes />
		</div>
	)
}

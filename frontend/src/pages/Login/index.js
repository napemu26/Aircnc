import React, { useState } from 'react'
import api from '../../services/api'

// Style
import './index.css'

export default ({ history }) => {
	const [email, setEmail] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		const response = await api.post('/sessions', { email })

		const { _id } = await response.data

		localStorage.setItem('user', _id)

		history.push('/dashboard')
	}

	function handleChange(e) {
		setEmail(e.target.value)
	}

	return (
		<>
			<div className='container'>
				<div className='content'>
					<p>
						Ofereça <strong>spots</strong> para programadores e encontre
						<strong> talentos </strong>
						para sua empresa
					</p>

					<form onSubmit={handleSubmit}>
						<label htmlFor='email'>E-Mail *</label>
						<input
							type='email'
							id='email'
							placeholder='Seu melhor E-Mail'
							value={email}
							onChange={handleChange}
						/>

						<button className='default-btn' type='submit'>
							Entrar
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

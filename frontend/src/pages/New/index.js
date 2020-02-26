import React, { useState, useMemo } from 'react'
import api from '../../services/api'

import camera from '../../assets/camera.svg'
import './index.css'

export default ({ history }) => {
	const [thumbnail, setThumb] = useState(null)
	const [company, setCompany] = useState('')
	const [techs, setTechs] = useState('')
	const [price, setPrice] = useState('')

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null
	}, [thumbnail])

	async function handleSubmit(e) {
		e.preventDefault()

		const Data = new FormData()
		const user_id = localStorage.getItem('user')

		Data.append('thumbnail', thumbnail)
		Data.append('company', company)
		Data.append('techs', techs)
		Data.append('price', price)

		await api.post('/spots', Data, {
			headers: { user_id },
		})

		history.push('/dashboard')
	}

	return (
		<div className='container'>
			<div className='content'>
				<form onSubmit={handleSubmit}>
					<label
						id='thumbnail'
						style={{ backgroundImage: `URL(${preview})` }}
						className={thumbnail ? 'has-thumbnail' : ''}
					>
						<input
							id='thumb-img'
							type='file'
							onChange={e => setThumb(e.target.files[0])}
						/>
						<img src={camera} alt='Select IMG' />
					</label>

					<label htmlFor='company'>EMPRESA *</label>
					<input
						id='company'
						placeholder='Sua Empresa'
						value={company}
						onChange={e => setCompany(e.target.value)}
					/>

					<label htmlFor='techs'>
						TECNOLOGIAS * <span>(Separadas por virgula)</span>
					</label>
					<input
						id='techs'
						placeholder='Quais tecnologias usam?'
						value={techs}
						onChange={e => setTechs(e.target.value)}
					/>

					<label htmlFor='price'>
						VALOR DA DIARIA * <span>(Em branco para gratuito!)</span>
					</label>
					<input
						id='price'
						placeholder='Sua Empresa'
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>

					<button type='submit' className='btn'>
						Cadastrar novo spot
					</button>
				</form>
			</div>
		</div>
	)
}

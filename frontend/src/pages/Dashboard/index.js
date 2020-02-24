import React, { useEffect, useState } from 'react'
import api from '../../services/api'

import './index.css'

export default () => {
	const [spots, setSpots] = useState([])

	useEffect(() => {
		async function loadSpots() {
			const user_id = localStorage.getItem('user')
			const response = await api.get('/dashboard', {
				headers: { user_id },
			})
			setSpots(response.data)
		}
		loadSpots()
	}, [])

	return (
		<div className='container'>
			<div className='content'>
				<ul className='spot-list'>
					{spots.map(spot => (
						<li key={spot._id}>
							<header />
							<strong>{spot.company}</strong>
							<span>{spot.price}</span>
							<p>{spot.techs}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

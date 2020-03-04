import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, StyleSheet, Image } from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List() {
	const [techs, setTechs] = useState([])

	useEffect(() => {
		AsyncStorage.getItem('techs').then(storagedTechs => {
			const techsArray = storagedTechs.split(',').map(tech => tech.trim())
			setTechs(techsArray)
		})
	}, [])

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={logo} />
			{techs.map(tech => (
				<SpotList key={tech} tech={tech} />
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	logo: {
		height: 32,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 70,
	},
})

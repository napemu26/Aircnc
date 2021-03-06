import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native'
import api from '../services/api'

export default function SpotList(props) {
	const { tech } = props

	const { spots, setSpots } = useState([])

	useEffect(() => {
		async function loadSpots() {
			const response = await api.get('/spots', {
				params: { tech },
			})
			setSpots(response.data)
		}

		loadSpots()
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Empresas que usam <Text style={styles.bold}>{tech}</Text>
			</Text>

			<FlatList
				style={styles.list}
				data={spots}
				keyExtractor={spot => spot._id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<Image
							style={styles.thumbnail}
							source={{ uri: item.thumbnail_url }}
						/>
						<Text style={styles.company}>{item.company}</Text>
						<Text style={styles.price}>
							{item.price ? `R$${item.price}/dia` : 'GRATUITO'}
						</Text>
						<TouchableOpacity style={styles.button} onPress={() => {}}>
							<Text style={styles.btnText}>Solicitar Reserva</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 30,
	},
	title: {
		fontSize: 20,
		color: '#444',
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	bold: {
		fontWeight: 'bold',
	},
})

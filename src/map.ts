import { CoordinatesSet } from '@/lib/map/types'
import { fetchMapBase64Image, fetchMinimapBase64Image } from '@/api/MapApi'
import Map from '@/lib/map/Map'
import router from '@/router'
import store from '@/store'

function onMapSelectionChange ({ x, y }: CoordinatesSet): void {
	router.push({ name: 'tile', query: { x, y } })
}

export async function initializeMap (mapContainer: HTMLDivElement): Promise<void> {
	const base64Strings = await Promise.all([
		fetchMapBase64Image(0),
		fetchMinimapBase64Image()
	])

	store.commit('setMap', new Map(
		mapContainer,
		base64Strings[0].data,
		base64Strings[1].data,
		onMapSelectionChange,
		0
	))
}

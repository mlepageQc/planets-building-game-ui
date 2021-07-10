import { createRouter, createWebHashHistory } from 'vue-router'
import Map from '../views/Map.vue'
import Tile from '../views/Tile.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'root',
			redirect: { name: 'map' }
		},
		{ 
			path: '/map', 
			name: 'map',
			component: Map,
			children: [
				{ 
					path: ':coordinates', 
					name: 'tile',
					component: Tile,
					props: (to) => {
						const coordinates = (to.params.coordinates as string).split(':')
						return { 
							x: coordinates[0], 
							y: coordinates[1]
						}
					}
				}
			]
		}
	]
})

export default router
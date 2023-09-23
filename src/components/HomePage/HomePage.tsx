import { Component, createEffect, createSignal } from 'solid-js'

import styles from './HomePage.module.css'
import { getRoomList } from '~/modules/matrix/matrix'
import { useMatrix } from '~/contexts'
import { Room } from 'matrix-js-sdk'

const HomePage: Component<{}> = props => {
	const [{ client }] = useMatrix()
	const [rooms, setRooms] = createSignal<Room[]>([])

	createEffect(async () => {
		setRooms(await getRoomList(client!))
	}, client)

	createEffect(() => {
		console.log({ rooms })
	}, rooms)

	return (
		<div class={styles.HomePage}>
			<main>
				<h1>Welcome to dimple</h1>
				<p>You're in {rooms().length} rooms</p>
			</main>
		</div>
	)
}
export default HomePage

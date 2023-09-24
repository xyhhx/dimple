import { Component, Index } from 'solid-js'

import { useMatrix } from '~/contexts'
import { RoomCard } from '~/components'

import styles from './Sidebar.module.css'

const Sidebar: Component<{}> = () => {
	const [state] = useMatrix()

	return (
		<aside class={styles.Sidebar}>
			<header class={styles.header}>Rooms</header>
			<main class={styles.main}>
				<ul class={styles.ul}>
					<Index each={state.rooms}>{room => <RoomCard room={room()} />}</Index>
				</ul>
			</main>
			<footer class={styles.footer}>{state.rooms.length} rooms</footer>
		</aside>
	)
}
export default Sidebar

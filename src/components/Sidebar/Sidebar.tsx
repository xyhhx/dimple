import { Component, For, createEffect } from 'solid-js'

import styles from './Sidebar.module.css'
import { useMatrix } from '~/contexts'

const Sidebar: Component<{}> = props => {
	const [{ rooms }] = useMatrix()

	return (
		<aside class={styles.Sidebar}>
			<header class={styles.header}>Rooms</header>
			<main class={styles.main}>
				<For each={rooms}>{room => <p>{JSON.stringify(room)}</p>}</For>
			</main>
			<footer class={styles.footer}>{rooms.length} rooms</footer>
		</aside>
	)
}
export default Sidebar

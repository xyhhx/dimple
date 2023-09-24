import { Component } from 'solid-js'

import { Sidebar } from '~/components'

import styles from './HomePage.module.css'

const HomePage: Component<{}> = () => (
	<div class={styles.HomePage}>
		<Sidebar />
		<main class={styles.main}>
			<h1>Welcome to dimple</h1>
		</main>
	</div>
)

export default HomePage

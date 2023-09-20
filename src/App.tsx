import type { Component } from 'solid-js'

import styles from './App.module.css'
import { LoginForm } from './components'

const App: Component<{}> = () => (
	<div class={styles.App}>
		<LoginForm />
	</div>
)

export default App

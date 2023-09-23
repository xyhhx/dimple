import { type Component } from 'solid-js'
import { Route, Routes, useNavigate } from '@solidjs/router'

import { useMatrix } from '~/contexts'
import { HomePage, LoginPage } from '~/components'

import styles from './App.module.css'

const App: Component<{}> = () => {
	const [account] = useMatrix()
	const navigate = useNavigate()

	if (account === null) navigate('/login')

	return (
		<div class={styles.App}>
			<Routes>
				<Route path="/" component={() => <HomePage />} />
				<Route path="/login" component={() => <LoginPage />} />
			</Routes>
		</div>
	)
}

export default App

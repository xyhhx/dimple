import { createEffect, type Component } from 'solid-js'
import { Route, Routes, useNavigate } from '@solidjs/router'

import { MatrixProvider, useMatrix } from '~/contexts'
import { HomePage, LoginPage } from '~/components'

import styles from './App.module.css'

const App: Component<{}> = () => {
	const [{ client }] = useMatrix()
	const navigate = useNavigate()

	createEffect(() => {
		if (client === null) navigate('/login')
		else navigate('/')
	}, client)

	return (
		<MatrixProvider>
			<div class={styles.App}>
				<Routes>
					<Route path="/" component={HomePage} />
					<Route path="/login" component={LoginPage} />
				</Routes>
			</div>
		</MatrixProvider>
	)
}

export default App

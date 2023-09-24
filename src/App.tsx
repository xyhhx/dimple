import { type Component, lazy, createEffect, Show } from 'solid-js'
import { Route, Routes } from '@solidjs/router'

import { MatrixProvider, useMatrix } from '~/contexts'
import { ReadyStates } from '~/contexts/Matrix/Matrix'

import styles from './App.module.css'

const homePage = lazy(() => import('~/components/HomePage'))
const loginPage = lazy(() => import('~/components/LoginPage'))
const roomPage = lazy(() => import('~/components/RoomPage'))

const App: Component<{}> = () => {
	const [matrix] = useMatrix()

	return (
		<MatrixProvider>
			<div class={styles.App}>
				<Routes>
					<Route path="/" component={homePage} />
					<Route path="/login" component={loginPage} />
					<Route path="/room/:id" component={roomPage} />
				</Routes>
				<Show when={matrix.readyState === ReadyStates.Authenticating}>
					<div class={styles.loading}>
						<strong>Loading...</strong>
					</div>
				</Show>
			</div>
		</MatrixProvider>
	)
}
export default App

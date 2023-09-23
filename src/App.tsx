import { lazy, type Component } from 'solid-js'

import styles from './App.module.css'

import { Route, Routes } from '@solidjs/router'

const Home = lazy(() => import('~/components/HomePage'))
const Login = lazy(() => import('~/components/LoginPage'))

const App: Component<{}> = () => (
	<div class={styles.App}>
		<Routes>
			<Route path="/" component={Home} />
			<Route path="/login" component={Login} />
		</Routes>
	</div>
)

export default App

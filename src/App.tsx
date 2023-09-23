import { lazy, type Component } from 'solid-js'

import styles from './App.module.css'

import { Route, Routes, useNavigate } from '@solidjs/router'
import { useMatrix } from './contexts'

const Home = lazy(() => import('~/components/HomePage'))
const Login = lazy(() => import('~/components/LoginPage'))

const App: Component<{}> = () => {
	const [account] = useMatrix()
	const navigate = useNavigate()

	if (account === null) navigate('/login')

	return (
		<div class={styles.App}>
			<Routes>
				<Route path="/" component={Home} />
				<Route path="/login" component={Login} />
			</Routes>
		</div>
	)
}

export default App

import { Component, createEffect } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import { LoginForm } from '~/components'
import { getOnlyTokenFromLocalStorage } from '~/contexts/Matrix/Matrix'

import styles from './LoginPage.module.css'

const LoginPage: Component<{}> = () => {
	const navigate = useNavigate()

	if (getOnlyTokenFromLocalStorage(localStorage)) navigate('/')

	return (
		<div class={styles.LoginPage}>
			<main>
				<header class={styles.header}>
					<h1>{`[dimple]`}</h1>
					<p>Sign into your matrix account to continue</p>
				</header>
				<LoginForm />
			</main>
		</div>
	)
}
export default LoginPage

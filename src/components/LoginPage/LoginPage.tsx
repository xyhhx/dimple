import { Component } from 'solid-js'

import { LoginForm } from '~/components'

import styles from './LoginPage.module.css'

const LoginPage: Component<{}> = props => (
	<div class={styles.LoginPage}>
		<LoginForm />
	</div>
)

export default LoginPage

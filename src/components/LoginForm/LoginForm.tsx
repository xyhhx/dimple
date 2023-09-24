import { Component, createEffect, onCleanup } from 'solid-js'

import { serializeForm } from '~/utils'

import styles from './LoginForm.module.css'
import { useMatrix } from '~/contexts'
import { useNavigate } from '@solidjs/router'

const LoginForm = () => {
	const [, { login }] = useMatrix()
	const navigate = useNavigate()

	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault()

		const loginArgs = serializeForm(event.target as HTMLFormElement)
		const loginResult = await login(loginArgs)
		if (loginResult) navigate('/')
	}

	return (
		<>
			<div class={styles.LoginForm}>
				<form onSubmit={handleSubmit}>
					<input
						type="url"
						id="baseUrl"
						name="baseUrl"
						placeholder="Your homeserver URL"
						required
					/>
					<input
						type="text"
						id="username"
						name="username"
						placeholder="Your username"
						required
					/>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Your matrix password"
						required
					/>
					<input type="submit" />
					<p>Fill out the form to continue.</p>
				</form>
			</div>
		</>
	)
}
export default LoginForm

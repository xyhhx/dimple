import { Component, onCleanup } from 'solid-js'

import { serializeForm } from '~/utils'

import styles from './LoginForm.module.css'
import { useMatrix } from '~/contexts'
import { useNavigate } from '@solidjs/router'

const LoginForm: Component<{}> = props => {
	const [, { login }] = useMatrix()
	const navigate = useNavigate()

	const handleSubmit = (ref: HTMLFormElement) => {
		const handler = async (event: SubmitEvent) => {
			event.preventDefault()

			const loginArgs = serializeForm(ref)
			const loginResult = await login(loginArgs)

			if (!!loginResult) navigate('/')
		}

		ref.addEventListener('submit', handler)

		onCleanup(() => ref.removeEventListener('submit', handler))
	}

	return (
		<>
			<div class={styles.LoginForm}>
				<form use:handleSubmit>
					<h4>Welcome to dimple</h4>
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

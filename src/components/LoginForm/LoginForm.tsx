import { type JSX, Component, onCleanup } from 'solid-js'
import { createClient, AuthType } from 'matrix-js-sdk'

import { serializeForm } from '~/utils'

import styles from './LoginForm.module.css'

const getLoginToken = async ({ baseUrl, user, password }) => {
	const loginClient = createClient({ baseUrl })
	const { access_token, device_id } = await loginClient.login(
		AuthType.Password,
		{
			user,
			password,
		},
	)
	loginClient.stopClient()

	return {
		baseUrl,
		userId: user,
		access_token,
		device_id,
	}
}

const handleSubmit = ref => {
	const handler = async event => {
		event.preventDefault()

		const { baseUrl, username: user, password } = serializeForm(ref)

		const tokenCreds = await getLoginToken({ baseUrl, user, password })
		console.log({ tokenCreds })
	}

	ref.addEventListener('submit', handler)

	onCleanup(() => ref.removeEventListener('submit', handler))
}

const LoginForm: Component<{}> = props => {
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
					/>
					<input
						type="text"
						id="username"
						name="username"
						placeholder="Your username"
					/>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="Your matrix password"
					/>
					<input type="submit" />
					<p>Fill out the form to continue.</p>
				</form>
			</div>
		</>
	)
}
export default LoginForm

import { Component, onCleanup } from 'solid-js'

import {
	getLoginTokenCredsFromPassword,
	getMatrixUrlFromBaseDomain,
	serializeForm,
} from '~/utils'

import styles from './LoginForm.module.css'

const handleSubmit = ref => {
	const handler = async event => {
		event.preventDefault()

		const { baseUrl, username: user, password } = serializeForm(ref)
		const matrixUrl = await getMatrixUrlFromBaseDomain(baseUrl)

		const tokenCreds = await getLoginTokenCredsFromPassword({
			baseUrl: matrixUrl,
			user,
			password,
		})
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

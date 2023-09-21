import { Component, onCleanup } from 'solid-js'

import { getMatrixUrlFromBaseDomain, serializeForm } from '~/utils'

import styles from './LoginForm.module.css'
import { start } from '~/modules/matrix/matrix'

const handleSubmit = ref => {
	const handler = async event => {
		event.preventDefault()

		const { baseUrl, username: user, password } = serializeForm(ref)

		const matrixUrl = await getMatrixUrlFromBaseDomain(baseUrl)
		if (!matrixUrl) {
			console.warn(`Invalid matrix urk: ${baseUrl}`)
			return false
		}

		const mxid = `@${user}:${new URL(baseUrl).host}`

		const client = await start({ baseUrl: matrixUrl, userId: mxid, password })

		console.log('✅', { client })
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

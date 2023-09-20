import { AuthType, createClient } from 'matrix-js-sdk'

/**
 * Takes password based credentials, authenticates, then returns the auth token based set of credientals
 */
const getLoginTokenCredsFromPassword = async ({
	baseUrl,
	user,
	password,
}: GetLoginTokenArgs) => {
	// @todo This could be moved to a doPasswordAuth util
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

interface GetLoginTokenArgs {
	baseUrl: string
	user: string
	password: string
}

export default getLoginTokenCredsFromPassword

import {
	ClientEvent,
	ICreateClientOpts,
	MatrixClient,
	createClient,
} from 'matrix-js-sdk'

/**
 * Create a matrix client using a token login.
 */
export const startClientWithToken = async (
	tokenLogin: TokenLogin | ICreateClientOpts,
): Promise<MatrixClient> => {
	const client = createClient({
		...tokenLogin,
	})

	console.log('initCrypto...')
	await client.initCrypto()
	console.log('startClient...')
	await client.startClient({ initialSyncLimit: 20 })

	console.log('state...')
	const state: string = await new Promise(resolve =>
		client.once(ClientEvent.Sync, resolve),
	)

	if (state !== 'PREPARED') throw new Error('Sync failed.')

	console.log('client', { client })
	return client
}

export default startClientWithToken

export interface TokenLogin {
	baseUrl: string
	userId: string
	accessToken: string
	deviceId: string
}

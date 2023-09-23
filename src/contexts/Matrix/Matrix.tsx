import { MatrixClient } from 'matrix-js-sdk'
import {
	Component,
	JSX,
	createContext,
	createEffect,
	useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { TokenLogin, start, startWithToken } from '~/modules/matrix/matrix'
import { getMatrixUrlFromBaseDomain } from '~/utils'

const localStorageTokenKey = 'dimple_token-auth'

const defaultState: ContextState = {
	client: null,
}

const MatrixContext = createContext<ContextValue>([
	defaultState,
	{
		login: async (args: LoginProps) => false,
	},
])

const getOnlyTokenFromLocalStorage = (localStorage: Storage) => {
	const tokenKey = Object.keys(localStorage).find(
		key => key.indexOf('token') === 0,
	)
	if (!tokenKey) return false
	return localStorage[tokenKey]
}

const getOnlyDeviceIdFromLocalStorage = (localStorage: Storage) => {
	const deviceKey = Object.keys(localStorage).find(
		key => key.indexOf('device') === 0,
	)
	if (!deviceKey) return false
	return localStorage[deviceKey]
}

const getTokenCreds = (localStorage: Storage): TokenLogin =>
	JSON.parse(localStorage.getItem(localStorageTokenKey)!)

export const MatrixProvider: Component<{ children: JSX.Element }> = props => {
	const [state, setState] = createStore<ContextState>(defaultState)
	const login = async ({ baseUrl, username, password }: LoginProps) => {
		const matrixUrl = await getMatrixUrlFromBaseDomain(baseUrl)

		if (!matrixUrl) {
			console.warn(`Invalid matrix url: ${baseUrl}`)
			return false
		}

		const mxid = `@${username}:${new URL(baseUrl).host}`
		const client = await start({ baseUrl: matrixUrl, userId: mxid, password })
		const accessToken = getOnlyTokenFromLocalStorage(localStorage)
		const deviceId = getOnlyDeviceIdFromLocalStorage(localStorage)
		const tokenLogin: TokenLogin = {
			accessToken,
			deviceId,
			baseUrl: matrixUrl,
			userId: mxid,
		}
		localStorage.setItem(localStorageTokenKey, JSON.stringify(tokenLogin))

		setState({
			client,
		})

		return !!client
	}

	createEffect(async () => {
		try {
			const tokenCreds = getTokenCreds(localStorage)
			console.log({ tokenCreds })

			if (!tokenCreds) return
			const client = await startWithToken(tokenCreds)

			console.log({ client })

			setState({
				client,
			})
		} catch (err) {
			console.log("Couldn't start client", err)
		}
	})

	return (
		<MatrixContext.Provider value={[state, { login }]}>
			{props.children}
		</MatrixContext.Provider>
	)
}

export const useMatrix = () => useContext(MatrixContext)
interface LoginProps {
	baseUrl: string
	username: string
	password: string
}

export type ContextState = {
	client: null | MatrixClient
}

export type ContextValue = [
	state: ContextState,
	actions: {
		login: (args: LoginProps) => Promise<boolean>
	},
]

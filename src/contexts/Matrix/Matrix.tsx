import { useNavigate } from '@solidjs/router'
import { MatrixClient, Room } from 'matrix-js-sdk'
import {
	Component,
	JSX,
	createContext,
	createEffect,
	useContext,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import {
	TokenLogin,
	getRoomList,
	start,
	startWithToken,
} from '~/modules/matrix/matrix'
import { getMatrixUrlFromBaseDomain } from '~/utils'

export enum ReadyStates {
	Uninitialized,
	Authenticating,
	Ready,
}

const localStorageTokenKey = 'dimple_token-auth'

const defaultState: ContextState = {
	client: null,
	readyState: ReadyStates.Uninitialized,
	rooms: [],
}

const MatrixContext = createContext<ContextValue>([
	defaultState,
	{
		login: async (args: LoginProps) => false,
	},
])

export const getOnlyTokenFromLocalStorage = (localStorage: Storage) => {
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

	const navigate = useNavigate()

	const login = async ({ baseUrl, username, password }: LoginProps) => {
		setState({ readyState: ReadyStates.Authenticating })
		const matrixUrl = await getMatrixUrlFromBaseDomain(baseUrl)

		if (!matrixUrl) {
			console.warn(`Invalid matrix url: ${baseUrl}`)
			return false
		}

		const mxid = `@${username}:${new URL(baseUrl).host}`
		const client = await start({ baseUrl: matrixUrl, userId: mxid, password })

		// Set token auth to localstorage
		const accessToken = getOnlyTokenFromLocalStorage(localStorage)
		const deviceId = getOnlyDeviceIdFromLocalStorage(localStorage)
		const tokenLogin: TokenLogin = {
			accessToken,
			deviceId,
			baseUrl: matrixUrl,
			userId: mxid,
		}
		localStorage.setItem(localStorageTokenKey, JSON.stringify(tokenLogin))
		bootstrap(client)

		setState({ readyState: ReadyStates.Ready })

		return !!client
	}

	const bootstrap = (client: MatrixClient) => {
		const rooms = getRoomList(client)
		// @ts-ignore
		globalThis.matrixClient = client
		const newState = { client, rooms }
		console.log(newState)
		setState(newState)
	}

	createEffect(async () => {
		if (state.client) return
		setState({ readyState: ReadyStates.Authenticating })
		try {
			const tokenCreds = getTokenCreds(localStorage)

			if (!tokenCreds) {
				navigate('/login')
				return
			}

			const client = await startWithToken(tokenCreds)
			bootstrap(client)

			console.log('Client automatically started', client)
		} catch (err) {
			console.log("Couldn't start client", err)
		} finally {
			setState({ readyState: ReadyStates.Ready })
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
	readyState: ReadyStates
	rooms: Room[]
}

export type ContextValue = [
	state: ContextState,
	actions: {
		login: (args: LoginProps) => Promise<boolean>
	},
]

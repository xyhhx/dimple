import { JSX, createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

import { start } from '~/modules/matrix/matrix'
import { getMatrixUrlFromBaseDomain, stub } from '~/utils'

interface LoginProps {
	baseUrl: string
	username: string
	password: string
}

export type ContextState = {
	account: null | {}
}

export type ContextValue = [
	state: ContextState,
	actions: {
		login: (args: LoginProps) => Promise<boolean> | undefined
	},
]

const defaultState: ContextState = {
	account: null,
}

export const MatrixContext = createContext<ContextValue>([
	defaultState,
	{
		login: stub,
	},
])

export const MatrixProvider = ({ children }: { children?: JSX.Element }) => {
	const [state, setState] = createStore<ContextState>(defaultState)

	const login = async ({ baseUrl, username, password }: LoginProps) => {
		const matrixUrl = await getMatrixUrlFromBaseDomain(baseUrl)
		console.log('login', { baseUrl, username, password })
		if (!matrixUrl) {
			console.warn(`Invalid matrix url: ${baseUrl}`)
			return false
		}

		const mxid = `@${username}:${new URL(baseUrl).host}`
		const client = await start({ baseUrl: matrixUrl, userId: mxid, password })
		return !!client
	}

	return (
		<MatrixContext.Provider value={[state, { login }]}>
			{children}
		</MatrixContext.Provider>
	)
}

export const useMatrix = () => useContext(MatrixContext)

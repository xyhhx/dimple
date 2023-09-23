import { Component, JSX, createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { start } from '~/modules/matrix/matrix'
import { getMatrixUrlFromBaseDomain } from '~/utils'

const defaultState: ContextState = {
	account: null,
}

const MatrixContext = createContext<ContextValue>([
	defaultState,
	{
		login: async (args: LoginProps) => false,
	},
])

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
		return !!client
	}

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
	account: null | {}
}

export type ContextValue = [
	state: ContextState,
	actions: {
		login: (args: LoginProps) => Promise<boolean>
	},
]

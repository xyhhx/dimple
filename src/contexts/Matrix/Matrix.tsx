import { JSX, createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

export type MatrixContextValue = [account: null | any]

const Matrix = createContext<MatrixContextValue>([null])

export const MatrixProvider = ({ children }: { children?: JSX.Element }) => {
	const [account, setAccount] = createStore({})
	return <Matrix.Provider value={[account]}>{children}</Matrix.Provider>
}

export const useMatrix = () => useContext(Matrix)

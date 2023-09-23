import { JSX, createContext, createSignal, useContext } from "solid-js";

const Matrix = createContext()

export const MatrixProvider = ({children}: {children?: JSX.Element}) => {
	const [value, setValue] = createSignal()
	return <Matrix.Provider value={ { value, setValue } }>{children}</Matrix.Provider>
}

export const useMatrix = () => useContext(Matrix)

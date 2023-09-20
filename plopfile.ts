import { NodePlopAPI } from 'plop'

import {
	componentGenerator,
	moduleGenerator,
	utilGenerator,
} from './config/plop/generators'

module.exports = function Plopfile(plop: NodePlopAPI) {
	componentGenerator(plop)
	moduleGenerator(plop)
	utilGenerator(plop)
}

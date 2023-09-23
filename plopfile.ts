import { NodePlopAPI } from 'plop'

import {
	contextGenerator,
	componentGenerator,
	moduleGenerator,
	utilGenerator,
} from './config/plop/generators'

module.exports = function Plopfile(plop: NodePlopAPI) {
	contextGenerator(plop)
	componentGenerator(plop)
	moduleGenerator(plop)
	utilGenerator(plop)
}

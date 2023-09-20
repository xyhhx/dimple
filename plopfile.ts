import { NodePlopAPI } from 'plop'

import { componentGenerator, utilGenerator } from './config/plop/generators'

module.exports = function Plopfile(plop: NodePlopAPI) {
	componentGenerator(plop)
	utilGenerator(plop)
}

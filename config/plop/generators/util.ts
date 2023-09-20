import { NodePlopAPI } from 'plop'

const indexFile = './src/utils/index.ts'

const utilGenerator = ({ setGenerator }: NodePlopAPI) =>
	setGenerator('util', {
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name of the util',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/utils/{{ camelCase name }}/{{ camelCase name }}.ts',
				templateFile: 'config/plop/templates/util/util.ts.hbs',
			},
			{
				type: 'add',
				path: 'src/utils/{{ camelCase name }}/index.ts',
				templateFile: 'config/plop/templates/util/index.ts.hbs',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop import injection \*\//g,
				template: "import {{ camelCase name }} from './{{ camelCase name }}'",
				type: 'append',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop export injection \*\//g,
				template: '\t{{ camelCase name }},',
				type: 'append',
			},
		],
	})

export default utilGenerator

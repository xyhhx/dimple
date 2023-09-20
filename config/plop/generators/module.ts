import { NodePlopAPI } from 'plop'

const indexFile = './src/modules/index.ts'

const moduleGenerator = ({ setGenerator }: NodePlopAPI) =>
	setGenerator('module', {
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name of the module',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/modules/{{ camelCase name }}/{{ camelCase name }}.ts',
				templateFile: 'config/plop/templates/module/module.ts.hbs',
			},
			{
				type: 'add',
				path: 'src/modules/{{ camelCase name }}/index.ts',
				templateFile: 'config/plop/templates/module/index.ts.hbs',
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

export default moduleGenerator

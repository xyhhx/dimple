import { NodePlopAPI } from 'plop'

const indexFile = './src/contexts/index.ts'

const contextGenerator = ({ setGenerator }: NodePlopAPI) =>
	setGenerator('context', {
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name of the context',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/contexts/{{ pascalCase name }}/{{ pascalCase name }}.tsx',
				templateFile: 'config/plop/templates/context/context.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/contexts/{{ pascalCase name }}/index.ts',
				templateFile: 'config/plop/templates/context/index.ts.hbs',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop import injection \*\//g,
				template: "import { {{ pascalCase name }}Provider, use{{ pascalCase name }} } from './{{ pascalCase name }}'",
				type: 'append',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop export injection \*\//g,
				template: '\t{{ pascalCase name }}Provider,',
				type: 'append',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop export injection \*\//g,
				template: '\tuse{{ pascalCase name }},',
				type: 'append',
			},
		],
	})

export default contextGenerator

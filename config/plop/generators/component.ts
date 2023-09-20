import { NodePlopAPI } from 'plop'

const indexFile = './src/components/index.ts'

const componentGenerator = ({ setGenerator }: NodePlopAPI) =>
	setGenerator('component', {
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'name of the component',
			},
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}/{{ pascalCase name }}.tsx',
				templateFile: 'config/plop/templates/component/component.tsx.hbs',
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}/{{ pascalCase name }}.module.css',
				templateFile:
					'config/plop/templates/component/component.module.css.hbs',
			},
			{
				type: 'add',
				path: 'src/components/{{ pascalCase name }}/index.ts',
				templateFile: 'config/plop/templates/component/index.ts.hbs',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop import injection \*\//g,
				template: "import {{ pascalCase name }} from './{{ pascalCase name }}'",
				type: 'append',
			},
			{
				path: indexFile,
				pattern: /\/\* @plop export injection \*\//g,
				template: '\t{{ pascalCase name }},',
				type: 'append',
			},
		],
	})

export default componentGenerator

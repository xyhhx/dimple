/**
 * Get simple object of inputs' values from an HTML form
 * @param formElement An HTML form
 * @returns
 */
const serializeForm = (formElement: HTMLFormElement): any =>
	[...formElement.querySelectorAll('input')]
		.filter(({ type }) => type !== 'submit')
		.reduce(
			(accumulator, { name, value }) => ({
				...accumulator,
				[name]: Object.keys(accumulator).includes(name)
					? [...accumulator[name], value]
					: value,
			}),
			{},
		)

export default serializeForm

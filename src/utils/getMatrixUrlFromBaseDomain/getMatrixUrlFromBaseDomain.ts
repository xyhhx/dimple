/**
 * Queries a domain's /.well-known/matrix/server for its m.server value
 * Will throw if nothing is found
 */
const getHomeserverFromWellKnown = async (baseDomain: string) => {
	try {
		const response = await fetch(`${baseDomain}/.well-known/matrix/server`)
		const wellKnown = await response.json()

		const wellKnownServerUrl =
			wellKnown['m.server'].indexOf('http') !== 0
				? `https://${wellKnown['m.server']}`
				: wellKnown['m.server']

		const { origin } = new URL(wellKnownServerUrl)

		return origin
	} catch (err) {
		return false
	}
}

/**
 * Given a base domain, it will see if there's a matrix server login endpoint. If not, it will check its .well-known to look for a specified server, in which case it will return that. If neither are successful, it will return false
 */
const getMatrixUrlFromBaseDomain = async (baseDomain: string) => {
	let response

	const { origin } = new URL(baseDomain)
	console.log({ origin })

	try {
		response = await fetch(`${origin}/_matrix/client/v3/login`)
		return origin
	} catch (e) {
		console.log(`${origin} is not a homeserver. Trying .well-known`)
		const homeserverUrl = await getHomeserverFromWellKnown(origin)
		return homeserverUrl
	}
}

export default getMatrixUrlFromBaseDomain

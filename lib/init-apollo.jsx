import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';


const wsLink = process.browser
	? new WebSocketLink({
			// if you instantiate in the server, the error will be thrown
			uri: `wss://eu1.prisma.sh/bridgewater-sprl/Formation-Wild-School/dev`,
			options: {
				reconnect: true
			}
		})
	: null

const httplink = new HttpLink({
	uri: 'https://eu1.prisma.sh/bridgewater-sprl/Formation-Wild-School/dev',
	credentials: 'same-origin'
})

const link = process.browser
	? split(
			//only create the split in the browser
			// split based on operation type
			({ query }) => {
				const { kind, operation } = getMainDefinition(query)
				return kind === 'OperationDefinition' && operation === 'subscription'
			},
			wsLink,
			httplink
		)
	: httplink

// Finally, create your ApolloClient instance with the modified network interface

let apolloClient = null

if (!process.browser) {
	global.fetch = fetch
}

function create(initialState) {
	const cache = new InMemoryCache().restore(initialState || {})
	return new ApolloClient({
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		link,
		cache,
		clientState: {
			defaults: {
				LocaleStatus: {
					__typename: 'Locale',
					Locale: 'fr'
				}
			}
		}
	})
}

export default function initApollo(initialState) {
	if (!process.browser) {
		return create(initialState)
	}

	if (!apolloClient) {
		apolloClient = create(initialState)
	}

	return apolloClient
}

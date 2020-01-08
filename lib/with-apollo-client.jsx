import ApolloClient, { InMemoryCache } from 'apollo-boost'
import withApollo from 'next-with-apollo'

export default withApollo(
	({ ctx, headers, initialState }) =>
		new ApolloClient({
			uri: 'https://eu1.prisma.sh/bridgewater-sprl/Formation-Wild-School/dev',
			cache: new InMemoryCache().restore(initialState || {})
		})
)

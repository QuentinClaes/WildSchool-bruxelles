import App from 'next/app';
import React from 'react';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import withApolloClient from '../lib/with-apollo-client.jsx';

class MyApp extends App {
	render() {
		const { t, Component, pageProps, apollo } = this.props
		const props = {
			...pageProps,
		}

		return (
					<ApolloProviderHooks client={apollo}>
						<Component {...props}/>
					</ApolloProviderHooks>
		)
	}
}

export default withApolloClient(MyApp)

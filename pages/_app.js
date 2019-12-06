
import App from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloProviderHooks } from 'react-apollo-hooks';
import withApolloClient from '../lib/with-apollo-client.jsx';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {}
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}
		return { pageProps }
	}

	render() {
		const { t, Component, pageProps, apolloClient } = this.props

		const props = {
			...pageProps,
		}

		return (
				<ApolloProvider client={apolloClient}>
					<ApolloProviderHooks client={apolloClient}>
						{/* <button onClick={methodDoesNotExist}>Break the world</button>; */}
						<Component {...props}/>
					</ApolloProviderHooks>
				</ApolloProvider>
		)
	}
}

export default withApolloClient(MyApp)

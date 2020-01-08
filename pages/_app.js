
import App from 'next/app';
import React from 'react';
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
		const { t, Component, pageProps, apollo } = this.props

		const props = {
			...pageProps,
		}

		return (
					<ApolloProviderHooks client={apollo}>
						{/* <button onClick={methodDoesNotExist}>Break the world</button>; */}
						<Component {...props}/>
					</ApolloProviderHooks>
		)
	}
}

export default withApolloClient(MyApp)

import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../graphql/apollo";

import '../styles/globals.css'

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
          </ApolloProvider>
      </SessionProvider>
  )
}

export default MyApp

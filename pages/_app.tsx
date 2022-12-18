import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client";
import { Nunito } from "@next/font/google";
import apolloClient from "../graphql/apollo";

import '../styles/globals.css'

const nunito = Nunito({
    weight: '400'
})

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
              <main className={nunito.className}>
                <Component {...pageProps} />
              </main>
          </ApolloProvider>
      </SessionProvider>
  )
}

export default MyApp

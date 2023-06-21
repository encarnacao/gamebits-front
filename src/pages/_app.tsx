import Layout from '@/components/layout'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
 
export default function MyApp({ Component, pageProps }:AppPropsWithLayout) {
  return (
    <Layout>
      <Head>
        <title>GameBits</title>
        <meta
          name="description"
          content="Catalogue seus jogos. Registre seu progresso. Compartilhe suas opiniões."
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
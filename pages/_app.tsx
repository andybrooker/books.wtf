import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { globalCss } from '@stitches/react'

const globalStyles = globalCss({
  '@font-face': {
    fontFamily: 'Ranade',
    src: 'url("/fonts/Ranade-Variable.woff2") format("woff2")',
    fontWeight: '100 700',
  }
})

function MyApp({ Component, pageProps }: AppProps) {

  globalStyles()

  return <Component {...pageProps} />
}

export default MyApp

import { Html, Head, Main, NextScript } from 'next/document'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

export default function Document() {
  return (
    <Html lang="en">
      <Head /> 
      <link rel="icon" href="/urllogo.png" />
      <body>
        <Main />
        <NextScript />
        {/*<SpeedInsights />*/}
        <Analytics />
      </body>
    </Html>
  )
}

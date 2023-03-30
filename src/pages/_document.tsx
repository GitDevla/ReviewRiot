import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="hu">
      <Head>
        <link rel="shortcut icon" href="/icon/logo.png" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

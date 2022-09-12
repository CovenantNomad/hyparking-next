import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/logo.jpg" />
        <meta property='og:image' content='/thumbnail.jpeg' />
        <meta name='twitter:image' content='/thumbnail.jpeg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
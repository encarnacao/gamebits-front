import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Lato:wght@700&family=Oswald:wght@500&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <title>GameBits</title>
        <meta
          name="description"
          content="Catalogue seus jogos. Registre seu progresso. Compartilhe suas opiniões."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

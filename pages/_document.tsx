import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";

export default function Document() {
  return (
    <Html lang="ja" {...mantineHtmlProps}>
      <Head>
      <meta property="og:title" content="ポケポケランクマシミュレーター" />
        <meta property="og:description" content="ポケポケランクマの勝率とpt増減の関係をシミュレーションできます" />
        <meta property="og:image" content="https://pokepoke.nwnwn.com/ogp.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pokepoke.nwnwn.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <ColorSchemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

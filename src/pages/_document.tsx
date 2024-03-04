import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  };

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="./favicon.ico" sizes="any" />
        </Head>
        <body className="content-rtl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

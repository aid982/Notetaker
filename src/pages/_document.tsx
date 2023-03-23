import { Html, Head, Main, NextScript } from 'next/document'


type Props = {}

function _document({ }: Props) {
    return (
        <Html data-theme="light">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>

        </Html>
    )
}

export default _document
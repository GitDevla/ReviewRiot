import Head from 'next/head'
import React from 'react'

function Title({ children }: { children: any }) {
    let title;
    if (typeof children == "string")
        title = children;
    else
        title = children.join("");

    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}

export default Title
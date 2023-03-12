import Layout from '@/component/Layout';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/Fetch';
import Head from 'next/head';

function SearchPage() {
    const [result, setResult] = useState([] as { id: number, name: string, picture: string, type: string }[])
    const [inputValue, setInputValue] = useState("")
    const timeoutId = useRef(null as NodeJS.Timeout | null);
    const cd = 200;

    async function query() {
        const res = await Fetch.GET("/api/search?name=" + inputValue);
        setResult(await res.json());
        console.log(result);

    }

    useEffect(() => {
        clearTimeout(timeoutId.current!);
        const newTimeoutId = setTimeout(() => {
            query()

        }, cd);
        timeoutId.current = newTimeoutId;
    }, [inputValue]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }
    return (
        <Layout>
            <Head>
                <title>Keresés</title>
            </Head>
            <div id='feed'>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                {result.map((i, id) => {
                    return <div key={id}>
                        <p>{i.type}:{i.name}</p>
                    </div>
                })}
            </div>
        </Layout>
    )
}

export default SearchPage;
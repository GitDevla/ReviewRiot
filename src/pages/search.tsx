import Layout from '@/component/Layout';
import React, { useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import Link from 'next/link';
import Title from '@/component/Title';
import RateLimitedInput from '@/component/RateLimitedInput';

function SearchPage() {
    const [result, setResult] = useState([] as { id: number, name: string, picture: string, type: string }[])
    const inputValue = useRef("");

    async function query() {
        const res = await Fetch.GET("/api/search?name=" + inputValue.current);
        setResult(await res.json());
    }

    useEffect(() => {
        query();
    }, []);

    return (
        <Layout>
            <Title>Keresés</Title>
            <div id='feed'>
                <RateLimitedInput value={inputValue} timeout={300} onChange={query} />
                {result.map((i, id) => {
                    return <div key={id}>
                        <p><Link href={`/${i.type}/${i.id}`}>{i.name}</Link></p>
                    </div>
                })}
            </div>
        </Layout>
    )
}

export default SearchPage;
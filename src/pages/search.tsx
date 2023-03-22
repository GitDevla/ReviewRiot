import Layout from '@/component/Layout';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import Link from 'next/link';
import Title from '@/component/Title';

function SearchPage() {
    const [result, setResult] = useState([] as { id: number, name: string, picture: string, type: string }[])
    const [inputValue, setInputValue] = useState("")
    const timeoutId = useRef(null as NodeJS.Timeout | null);
    const cd = 300;

    async function query() {
        const res = await Fetch.GET("/api/search?name=" + inputValue);
        setResult(await res.json());
    }

    useEffect(() => {
        query();
        clearTimeout(timeoutId.current!);
        const newTimeoutId = setTimeout(() => {
            query();
        }, cd);
        timeoutId.current = newTimeoutId;
    }, [inputValue]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }
    return (
        <Layout>
            <Title>Keresés</Title>
            <div id='feed'>
                <input type="text" value={inputValue} onChange={handleInputChange} />
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
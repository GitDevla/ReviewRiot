import Layout from '@/component/Layout';
import React, { useEffect, useRef, useState } from 'react'
import { Fetch } from '@/util/frontend/Fetch';
import Link from 'next/link';
import Title from '@/component/Title';
import RateLimitedInput from '@/component/input/RateLimitedInput';
import style from '@/styles/prettyList.module.scss';
type searchModel = { id: number, name: string, picture: string, type: string }

function SearchPage() {
    const [result, setResult] = useState([] as searchModel[])
    const inputValue = useRef("");
    const [loading, setLoading] = useState(true);

    async function query() {
        setLoading(true);
        const res = await Fetch.GET("/api/search?name=" + inputValue.current);
        let sorted = await res.json() as searchModel[];
        if (inputValue.current != "")
            sorted = sorted.sort((a, b) => compareNames(a, b, inputValue.current));
        setResult(sorted);
        setLoading(false);
    }

    useEffect(() => {
        query();
    }, []);

    return (
        <Layout>
            <Title>Keresés</Title>
            <div className={style.filter}>
                <label>Név</label><br />
                <RateLimitedInput value={inputValue} timeout={225} onChange={query} />
            </div>
            <ul className={style.list}>
                {result.map((i, id) => {
                    return <Link key={id} href={`/${i.type}/${i.id}`}>{i.type == "movie" ? "Film" : "Felhasználó"}: {i.name}</Link>
                })}
            </ul>
            {loading && <p className='error'>Töltés...</p>}
            {(!loading && result.length == 0) && <p className='error'>Nincs ilyen találat</p>}
        </Layout >
    )
}

export default SearchPage;



function compareNames(a: searchModel, b: searchModel, key: string) {
    const aSimilarity = getSimilarity(a.name, key);
    const bSimilarity = getSimilarity(b.name, key);

    if (aSimilarity > bSimilarity) {
        return -1;
    } else if (aSimilarity < bSimilarity) {
        return 1;
    } else {
        return 0;
    }
}

function getSimilarity(str: string, key: string) {
    const distance = levenshteinDistance(key.toLowerCase(), str.toLowerCase());
    return 1 / (distance + 1);
}

function levenshteinDistance(str1: string, str2: string) {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
        for (let j = 1; j <= str1.length; j++) {
            if (i === 0) {
                matrix[i][j] = j;
            } else {
                const deletion = matrix[i - 1][j] + 1;
                const insertion = matrix[i][j - 1] + 1;
                const substitution = matrix[i - 1][j - 1] + (str2[i - 1] === str1[j - 1] ? 0 : 1);
                matrix[i][j] = Math.min(deletion, insertion, substitution);
            }
        }
    }
    return matrix[str2.length][str1.length];
}
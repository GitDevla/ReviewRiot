import MovieCreateForm from '@/component/form/MovieCreateForm';
import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import { isAdmin } from '@/util/frontend/isAdmin';
import Head from 'next/head';
import router from 'next/router';
import React, { useEffect } from 'react'

function MovieEditPage() {
    useEffect(() => {
        isAdmin().catch(() => router.push("/auth"));
    }, [])

    return (
        <Layout>
            <Head>
                <title>Új film létrehozása</title>
            </Head>
            <SettingsNavbar />
            <MovieCreateForm />
        </Layout>
    )
}

export default MovieEditPage
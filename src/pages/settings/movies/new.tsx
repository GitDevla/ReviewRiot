import MovieCreateForm from '@/component/form/MovieCreateForm';
import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import Title from '@/component/Title';
import { getUserPermission } from '@/util/frontend/isAdmin';
import router from 'next/router';
import React, { useEffect } from 'react'

function MovieEditPage() {
    useEffect(() => {
        getUserPermission().catch(() => router.push("/auth"));
    }, [])

    return (
        <Layout>
            <Title>Új film létrehozása</Title>
            <SettingsNavbar />
            <MovieCreateForm />
        </Layout>
    )
}

export default MovieEditPage
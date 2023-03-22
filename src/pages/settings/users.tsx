import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import Title from '@/component/Title';
import { isAdmin } from '@/util/frontend/isAdmin';
import router from 'next/router';
import React, { useEffect } from 'react'

function SettingsProfilePage() {
    useEffect(() => {
        isAdmin().catch(() => router.push("/auth"));
    }, [])

    return (
        <Layout>
            <Title>Felhasználók beállításai</Title>
            <SettingsNavbar />
        </Layout>
    )
}

export default SettingsProfilePage
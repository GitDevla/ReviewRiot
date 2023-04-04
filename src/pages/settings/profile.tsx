import Layout from '@/component/Layout'
import React, { useEffect, useState } from 'react'
import SettingsNavbar from '@/component/SettingsNavbar';
import ProfileEditForm from '@/component/form/ProfileEditForm';
import { getIsAdmin } from '@/util/frontend/isAdmin';
import { getLoggedIn } from '@/util/frontend/getLoggedIn';
import router from 'next/router';
import Title from '@/component/Title';

function SettingsProfilePage() {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        getLoggedIn().catch(() => router.push("/auth"));
        getIsAdmin().then(() => setIsAdmin(true)).catch(() => { });
    }, [])

    return (
        <Layout>
            <Title>Profil beállítások</Title>
            {isAdmin && <SettingsNavbar />}
            <h1>Profil beállítások</h1>
            <ProfileEditForm />
        </Layout >
    )
}

export default SettingsProfilePage
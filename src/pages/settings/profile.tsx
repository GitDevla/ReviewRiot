import Layout from '@/component/Layout'
import { Fetch } from '@/util/frontend/Fetch';
import { PermissionLevel } from '@/util/PermissionLevels';
import React, { useEffect, useState } from 'react'
import SettingsNavbar from '@/component/SettingsNavbar';
import ProfileEditForm from '@/component/form/ProfileEditForm';
import Head from 'next/head';

function SettingsProfilePage() {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        async function getIsAdmin() {
            const res = await Fetch.GET("/api/permission");
            const json = await res.json();
            setIsAdmin(json.level >= PermissionLevel.admin)
        }

        getIsAdmin();
    }, [])

    return (

        <Layout>
            <Head>
                <title>Profil beállítások</title>
            </Head>
            {isAdmin && <SettingsNavbar />}
            <ProfileEditForm />
        </Layout >
    )
}

export default SettingsProfilePage
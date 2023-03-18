import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import { Fetch } from '@/util/frontend/Fetch';
import { PermissionLevel } from '@/util/PermissionLevels';
import Head from 'next/head';
import router from 'next/router';
import React, { useEffect } from 'react'

function SettingsProfilePage() {
    useEffect(() => {
        async function getIsAdmin() {
            const res = await Fetch.GET("/api/permission");
            if (!res.ok) throw Error();
            const json = await res.json();
            if (json.level <= PermissionLevel.admin) throw Error();
        }
        getIsAdmin().catch(() => router.push("/auth"));
    }, [])

    return (
        <Layout>
            <Head>
                <title>Felhasználók beállításai</title>
            </Head>
            <SettingsNavbar />

        </Layout>
    )
}

export default SettingsProfilePage
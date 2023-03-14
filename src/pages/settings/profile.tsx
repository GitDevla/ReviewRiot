import Layout from '@/component/Layout'
import { Fetch } from '@/util/Fetch';
import { PermissionLevel } from '@/util/PermissionLevels';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { UserModel } from '@/model/UserModel';
import SettingsNavbar from '@/component/SettingsNavbar';
import { resetCache, useUser } from '@/util/useUser';

function SettingsProfilePage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({} as UserModel);
    const [file, setFile] = useState(null as any);


    useEffect(() => {
        async function getIsAdmin() {
            const res = await Fetch.GET("/api/permission");
            const json = await res.json();
            setIsAdmin(json.level >= PermissionLevel.admin)
        }

        useUser().then(i => setUser(i!)).catch(i => alert("TODO"));
        getIsAdmin();
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = new FormData();
        body.append("file", file);
        await fetch("/api/user/update", {
            method: "PUT",
            body
        });
        resetCache();
    };

    return (
        <Layout>
            {isAdmin && <SettingsNavbar />}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Image src={user.picturePath} alt="" width={100} height={100}></Image>
                <input type="file" name="" id="" onChange={i => setFile(i.target.files![0])} />
                <input type="submit" value="" />
            </form>
        </Layout>
    )
}

export default SettingsProfilePage
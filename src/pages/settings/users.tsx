import Layout from '@/component/Layout'
import SettingsNavbar from '@/component/SettingsNavbar'
import Title from '@/component/Title';
import { PermissionModel } from '@/model/PermissionModel';
import { UserModel } from '@/model/UserModel';
import { Fetch } from '@/util/frontend/Fetch';
import { getIsAdmin } from '@/util/frontend/isAdmin';
import router from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react'
import style from '@/styles/prettyList.module.scss';


function SettingsProfilePage() {
    const [users, setUsers] = useState([] as UserModel[]);
    const [perms, setPerms] = useState([] as PermissionModel[]);
    useEffect(() => {
        async function fetch() {
            let res = await Fetch.GET("/api/user");
            setUsers((await res.json()).users);
            res = await Fetch.GET("/api/permission?all=true");
            setPerms((await res.json()).perms);
        }

        getIsAdmin().then(() => fetch()).catch(() => router.push("/auth"));
    }, [])

    async function handleClick(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        // @ts-ignore: Unreachable code error
        const userID = e.target.parentElement.value;

        await Fetch.PUT("/api/permission", {
            whom: userID,
            permID: parseInt(e.target.value)
        })
        router.reload();
    }

    return (
        <Layout>
            <Title>Felhasználók beállításai</Title>
            <SettingsNavbar />
            <ul className={style.list}>
                {users.map(i => <li key={i.id} value={i.id}>{i.name}
                    <select defaultValue={i.permissionID} onChange={handleClick} >
                        {perms.map(j => <option key={j.id} selected={j.id === i.permissionID} value={j.id}>{j.name}</option>)}
                    </select>
                </li>)}
            </ul>
        </Layout>
    )
}

export default SettingsProfilePage
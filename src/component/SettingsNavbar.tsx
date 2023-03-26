import Link from 'next/link'
import React from 'react'
import style from '@/styles/settingsNav.module.scss';
import { useRouter } from 'next/router';

function SettingsNavbar() {
    let { pathname } = useRouter();
    pathname = pathname.split("/").at(-1)!;

    return (
        <nav className={style.nav}>
            <ul>
                <li><Link className={pathname == "profile" ? style.active : ""} href={"/settings/profile"}>Profil</Link></li>
                <li><Link className={pathname == "movies" ? style.active : ""} href={"/settings/movies"}>Filmek</Link></li>
                <li><Link className={pathname == "users" ? style.active : ""} href={"/settings/users"}>Felhasználók</Link></li>
            </ul>
        </nav>
    )
}

export default SettingsNavbar
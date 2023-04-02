import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { logout, tryGetLoggedIn } from '@/util/frontend/getLoggedIn'
import { useRouter } from 'next/router'
import HomeSVG from '@/../public/icon/home.svg';
import FeedSVG from '@/../public/icon/feed.svg';
import MoviesSVG from '@/../public/icon/movies.svg';
import SearchSVG from '@/../public/icon/search.svg';
import SettingsSVG from '@/../public/icon/settings.svg';
import UserSVG from '@/../public/icon/user.svg';
import { SafeUserModel } from '@/interface/SafeUserModel'

function Sidebar() {
    const [user, setUser] = useState(null as SafeUserModel | null)
    let { pathname } = useRouter();
    pathname = pathname.split("/")[1];

    useEffect(() => {
        tryGetLoggedIn()
            .then(res => setUser(res))
    }, [])

    return (
        <div className='sidebar'>
            <div>
                <img src="/icon/logo.png" alt="" width={75} className="hide_phone" />
            </div>
            <nav>
                <ul>
                    <li className={pathname == "home" ? "active" : ""}><Link href="/home"><HomeSVG /><span>Főoldal</span></Link></li>
                    {user && <li className={pathname == "feed" ? "active" : ""}><Link href="/feed"><FeedSVG /><span>Bejegyzéslista</span></Link></li>}
                    <li className={pathname.startsWith("movie") ? "active" : ""}><Link href="/movies"><MoviesSVG /><span>Filmek</span></Link></li>
                    <li className={pathname == "search" ? "active" : ""}><Link href="/search"><SearchSVG /><span>Keresés</span></Link></li>
                    <hr />
                    {user && <li className={pathname == "settings" ? "active" : ""}><Link href="/settings/profile"><SettingsSVG /><span>Beállítások</span></Link></li>}
                    <li className='bottom'>{!user ?
                        <div><Link href="/auth"><UserSVG /><span>Bejelentkezés</span></Link></div> :
                        <div onClick={() => logout()} className="flex center hover">
                            <div className='hover_inside'>
                                <p style={{ color: "var(--a2)" }}>Kilépés X</p>
                            </div>
                            <img className='round'
                                src={user.picturePath} alt='Profilkép' width={50} height={50} />
                            <span>{user.name}</span>
                        </div>
                    }</li>
                </ul>
            </nav>
        </div >
    )
}

export default Sidebar

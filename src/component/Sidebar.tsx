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
import Image from 'next/image';

function Sidebar() {
    const [user, setUser] = useState(null as SafeUserModel | null)
    let { pathname } = useRouter();
    pathname = pathname.split("/")[1];

    useEffect(() => {
        tryGetLoggedIn()
            .then(res => setUser(res))
    }, [])

    function logoutConfirm() {
        if (!confirm("Biztos ki akar lépni?")) return;
        logout();
    }

    return (
        <div className='sidebar'>
            <div>
                <Link href="/home">
                    <Image src="/icon/logo.png" alt="Logo" width={75} height={75} className="hide_phone" />
                </Link>
            </div>
            <nav>
                <ul>
                    <li className={pathname == "home" ? "active" : ""}><Link href="/home"><HomeSVG /><span>Főoldal</span></Link></li>
                    {user && <li className={pathname == "feed" ? "active" : ""}><Link href="/feed"><FeedSVG /><span>Bejegyzéslista</span></Link></li>}
                    <li className={pathname.startsWith("movie") ? "active" : ""}><Link href="/movies"><MoviesSVG /><span>Filmek</span></Link></li>
                    <li className={pathname == "search" ? "active" : ""}><Link href="/search"><SearchSVG /><span>Keresés</span></Link></li>
                    <hr />
                    {user && <li className={pathname == "settings" ? "active" : ""}><Link href="/settings/profile"><SettingsSVG /><span>Beállítások</span></Link></li>}
                    <li className='bottom w-100'>{!user ?
                        <div><Link href="/auth"><UserSVG /><span>Bejelentkezés</span></Link></div> :
                        <div onClick={logoutConfirm} className="flex center hover">
                            <div className='hover_inside'>
                                <p className='c-a2'>❌ Kilépés ❌</p>
                            </div>
                            <img className='pfp' src={user.picturePath} alt='Profilkép' width={50} />
                            <span className='overflow-hide'>{user.name}</span>
                        </div>
                    }</li>
                </ul>
            </nav>
        </div >
    )
}

export default Sidebar

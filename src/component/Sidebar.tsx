import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UserModel } from '@/model/UserModel'
import { logout, useUser } from '@/util/useUser'
import { useRouter } from 'next/router'

function Sidebar() {
    const [user, setUser] = useState(null as UserModel | null)
    const { pathname } = useRouter();

    useEffect(() => {
        useUser()
            .then(res => setUser(res))
    }, [])

    return (
        <div className='sidebar'>
            <div>
                [logo]
            </div>
            <nav>
                <ul>
                    <li className={pathname == "/home" ? "active" : ""}><Link href="/home">Főoldal</Link></li>
                    {user && <li className={pathname == "/feed" ? "active" : ""}><Link href="/feed">Bejegyzéslista</Link></li>}
                    <li className={pathname == "/movies" ? "active" : ""}><Link href="/movies">Filmek</Link></li>
                    <li className={pathname == "/search" ? "active" : ""}><Link href="/search">Keresés</Link></li>
                    <hr />
                    <li>Beállítások</li>
                </ul>
            </nav>
            <div className='bottom'>
                {!user ?
                    <div><Link href="/auth">Belépés/Regisztráció</Link></div> :
                    <div onClick={() => logout()}>
                        <Image className='round'
                            src={user.picturePath} alt='Profilkép' width={50} height={50} />
                        <span>{user.name}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Sidebar

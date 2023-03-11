import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { UserModel } from '@/model/UserModel'
import { logout, useUser } from '@/util/useUser'

function Sidebar() {
    const [user, setUser] = useState(null as UserModel | null)

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
                    <li><Link href="/home">Főoldal</Link></li>
                    {user && <li><Link href="/feed">Bejegyzéslista</Link></li>}
                    <li><Link href="/movies">Filmek</Link></li>
                    <li><Link href="/search">Keresés</Link></li>
                    <hr />
                    <li>Beállítások</li>
                </ul>
            </nav>
            <div className='bottom'>
                {!user ?
                    <div><Link href="/auth">Belépés/Regisztráció</Link></div> :
                    <div onClick={() => logout()}>
                        <Image className='round'
                            src={user.picturePath ?? "/image/user/temp.png"} alt='Profilkép' width={50} height={50} />
                        <span>{user.name}</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Sidebar

import Link from 'next/link'
import React from 'react'

function SettingsNavbar() {
    return (
        <nav>
            <ul>
                <li><Link href={"/settings/profile"}>Profil</Link></li>
                <li><Link href={"/settings/movies"}>Filmek</Link></li>
                <li><Link href={"/settings/users"}>Felhasználók</Link></li>
            </ul>
        </nav>
    )
}

export default SettingsNavbar
import Link from 'next/link'
import React from 'react'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div>
                [logo]
            </div>
            <nav>
                <ul>
                    <li><Link href="/home">Főoldal</Link></li>
                    <li>Bejegyzéslista</li>
                    <li><Link href="/movies">Filmek</Link></li>
                    <li>Keresés</li>
                    <hr />
                    <li>Beállítások</li>
                </ul>
            </nav>
            <div>
                <img src="/image/user/temp.png" alt="" />
                <span>Név</span>
            </div>
        </div>
    )
}

export default Sidebar

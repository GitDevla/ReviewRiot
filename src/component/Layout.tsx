import React, { ReactNode } from 'react'
import Sidebar from './Sidebar';

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className='layout'>
            <Sidebar />
            <div className='content'>
                {children}
            </div>

        </div>
    )
}

export default Layout

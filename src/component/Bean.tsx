import React, { ReactNode } from 'react'

function Bean({ children, onClick }: { children: ReactNode, onClick?: Function }) {
    return (
        <span className="genreTag" onClick={() => onClick ? onClick() : null}>{children}</span>
    )
}

export default Bean
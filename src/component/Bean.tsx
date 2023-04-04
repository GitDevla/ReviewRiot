import React, { ReactNode } from 'react'

function Bean({ children, onClick }: { children: ReactNode, onClick: Function }) {
    return (
        <span className="genreTag" onClick={() => onClick()}>{children}</span>
    )
}

export default Bean
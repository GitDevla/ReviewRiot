import Router from 'next/router'
import React from 'react'

function GoBack() {
    return (
        <div onClick={() => Router.back()}>GoBack</div>
    )
}

export default GoBack
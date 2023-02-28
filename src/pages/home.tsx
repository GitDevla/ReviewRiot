import { UserModel } from '@/model/UserModel';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Home() {
    const [userdata, setUserdata] = useState({} as UserModel)
    const router = useRouter();

    useEffect(() => {
        fetch('/api/auth')
            .then(res => {
                if (!res.ok) throw new Error()
                return res.json()
            })
            .then(res => setUserdata(res.user))
            .catch(() => router.push("/login"));
    }, []);

    return (
        <p>Helló {userdata.name}</p>
    )
}

export default Home;
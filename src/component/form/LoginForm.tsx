import { ExpectedError, HTTPError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import router from 'next/router';
import React from 'react'
import { useState } from 'react'

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await Fetch.POST('/api/auth', { username, password })
            if (!response.ok)
                throw new ExpectedError((await response.json()).error);
            router.push('/home');
        } catch (error) {
            if (error instanceof ExpectedError || error instanceof HTTPError)
                setErrorMessage(error.message);
            else
                setErrorMessage('Ismeretlen hiba történt');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" autoComplete='username' placeholder='Felhasználónév' required onChange={(e) => setUsername(e.target.value)} />
            <input type="password" autoComplete='current-password' placeholder='Jelszó' required onChange={(e) => setPassword(e.target.value)} />
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Belépés" />
        </form >
    )
}

export default LoginForm

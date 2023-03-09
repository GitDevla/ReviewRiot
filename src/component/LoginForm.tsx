import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const json = await response.json();

            if (!response.ok)
                throw new Error(json.error);
            router.push('/home');
        } catch (error) {
            if (error instanceof Error)
                setErrorMessage(error.message);
            else
                setErrorMessage('Ismeretlen hiba történt');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Felhasználónév' onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Jelszó' onChange={(e) => setPassword(e.target.value)} />
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Belépés" />
        </form >
    )
}

export default LoginForm

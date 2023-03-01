import { validateUserRegister } from '@/validator/userValidator';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            validateUserRegister({ username, password, email })
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });
            const json = await response.json();

            if (!response.ok)
                throw new Error(json.error);
            router.push('/login');
        } catch (error) {
            if (error instanceof Error)
                setErrorMessage(error.message);
            else
                setErrorMessage('Ismeretlen hiba történt');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Felhasználónév:
                <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Jelszó:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Regisztráció</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    )
}

export default Register

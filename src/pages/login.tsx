import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'

function LoginPage() {
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
            if (!response.ok)
                throw new Error(response.status.toString());
            router.push('/home');
        } catch (error) {
            if (error instanceof Error && error.message == "401")
                setErrorMessage("Hibás jelszó vagy felhasználónév");
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
                Jelszó:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Belépés</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    )
}

export default LoginPage

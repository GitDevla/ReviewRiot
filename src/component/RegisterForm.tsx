import { validateUserRegister } from '@/validator/userValidator';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react'

function RegisterForm() {
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
            <input type="text" placeholder='Felhasználónév' onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Jelszó' onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Regisztráció" />
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    )
}

export default RegisterForm

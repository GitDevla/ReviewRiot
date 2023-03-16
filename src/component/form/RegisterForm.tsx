import { ExpectedError, HTTPError } from '@/util/Errors';
import { Fetch } from '@/util/frontend/Fetch';
import { validateUserRegister } from '@/validator/userValidator';
import React from 'react'
import { useState } from 'react'

function RegisterForm({ next }: { next: Function }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            validateUserRegister({ username, password, email })
            const response = await Fetch.POST("/api/user", { username, email, password });

            if (!response.ok)
                throw new ExpectedError((await response.json()).error);
            next();
        } catch (error) {
            if (error instanceof ExpectedError || error instanceof HTTPError)
                setErrorMessage(error.message);
            else
                setErrorMessage('Ismeretlen hiba történt');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Felhasználónév' required onChange={(e) => setUsername(e.target.value)} />
            <input type="email" placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Jelszó' required onChange={(e) => setPassword(e.target.value)} />
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Regisztráció" />
        </form>
    )
}

export default RegisterForm

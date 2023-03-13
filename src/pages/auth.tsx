import React from 'react'
import { useState } from 'react'
import styles from '@/styles/login.module.scss';
import LoginForm from '@/component/form/LoginForm';
import RegisterForm from '@/component/form/RegisterForm';
import Head from 'next/head';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => setIsLogin(!isLogin);

    return (
        <div className={styles.wrapper}>
            {isLogin ? (
                <>
                    <Head>
                        <title>Belépés</title>
                    </Head>
                    <LoginForm />
                    <p>
                        Nincsen még fiókja? <a href='#' onClick={toggle}>Regisztráljon</a>
                    </p>
                </>
            ) : (
                <>
                    <Head>
                        <title>Regisztráció</title>
                    </Head>
                    <RegisterForm next={toggle} />
                    <p>
                        Van már fiókja? <a href='#' onClick={toggle}>Belépés</a>
                    </p>
                </>
            )}

        </div>
    )
}

export default AuthPage

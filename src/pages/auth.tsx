import React from 'react'
import { useState } from 'react'
import styles from '@/styles/login.module.scss';
import LoginForm from '@/component/form/LoginForm';
import RegisterForm from '@/component/form/RegisterForm';
import { getLoggedIn } from '@/util/frontend/getLoggedIn';
import Router from 'next/router';
import Title from '@/component/Title';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    getLoggedIn().then(() => Router.push("/home")).catch(() => { });
    const toggle = () => setIsLogin(!isLogin);

    return (
        <div className={styles.wrapper}>
            {isLogin ? (
                <>
                    <Title>Belépés</Title>
                    <LoginForm />
                    <p>
                        Nincsen még fiókja? <a href='#' onClick={toggle}>Regisztráljon</a>
                    </p>
                </>
            ) : (
                <>
                    <Title>Regisztráció</Title>
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

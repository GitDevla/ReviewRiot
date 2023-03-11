import React from 'react'
import { useState } from 'react'
import styles from '@/styles/login.module.css';
import LoginForm from '@/component/LoginForm';
import RegisterForm from '@/component/RegisterForm';

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const toggle = () => setIsLogin(!isLogin);

    return (
        <div className={styles.wrapper}>
            {isLogin ? (
                <>
                    <LoginForm />
                    <p>
                        Nincsen még fiókja? <a href='#' onClick={toggle}>Regisztráljon</a>
                    </p>
                </>
            ) : (
                <>
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

import React from 'react'
import { useState } from 'react'
import styles from '@/styles/login.module.css';
import LoginForm from '@/component/LoginForm';
import RegisterForm from '@/component/RegisterForm';

function auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className={styles.wrapper}>
            {isLogin ? (
                <>
                    <LoginForm />
                    <p>
                        Nincsen még fiókja? <a onClick={() => setIsLogin(!isLogin)}>Regisztráljon</a>
                    </p>
                </>
            ) : (
                <>
                    <RegisterForm />
                    <p>
                        Van még fiókja? <a onClick={() => setIsLogin(!isLogin)}>Belépés</a>
                    </p>
                </>
            )}

        </div>
    )
}

export default auth

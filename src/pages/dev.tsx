import Layout from '@/component/Layout'
import Title from '@/component/Title'
import React from 'react'

function DevPage() {
    return (
        <Layout>
            <Title>API</Title>
            <div>
                <h1>API</h1>
                <p>Ez az oldal programozóknak van akik fel akarják használni az adatbázisban található adatokat.</p>
                <p>A backend teszteléséhez használjon <a href="https://insomnia.rest/">Insomnia</a> vagy <a href="https://www.postman.com/">Postman</a> nevezetű API tesztelő programokat.</p>
                <p>A backend a <a href="http://localhost:3000/api">localhost:3000/api</a> URL-en találhatóak</p>
            </div>
        </Layout>
    )
}

export default DevPage
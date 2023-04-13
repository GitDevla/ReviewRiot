import Layout from '@/component/Layout'
import Title from '@/component/Title'
import React from 'react'

function DevPage() {
    function format(i: any) {
        return JSON.stringify(i, null, 4);
    }
    return (
        <Layout>
            <Title>api</Title>
            <div>
                <h1>/api/</h1>
                <p>Ez az oldal programozóknak van akik fel akarják használni az adatbázisban található adatokat.</p>
                <p>A backend teszteléséhez használjon <a href="https://insomnia.rest/">Insomnia</a> vagy <a href="https://www.postman.com/">Postman</a> nevezetű API tesztelő programokat.</p>
                <p>A backend a <a href="/api">/api</a> URL-en található</p>
                <details>
                    <summary>
                        <h2>API kézikönyv és jelmagyarázat</h2>
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>Jogi szintek</h3>
                        <ul>
                            <li>(semmi): Nincsen joghoz kötve</li>
                            <li>👤: Bejelentkezés kötelező</li>
                            <li>🛡️: Minimum moderátori fiókkal</li>
                            <li>🛠️: Csak admin fiókkal</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Paraméter / Body / Form Jelentése</h3>
                        <p>A <b>paramétereket</b> az URLbe adjuk át, egy kérdőjellel (?) elválasztva az oldaltól és a paraméterek "és jellel" (&) elválasztva egymástol az alábbi módon:</p>
                        <pre>       /api/feed?page=0&max=20</pre>
                        <p>A <b>body</b> adatait ezzel szemben egy JSON objektumban küldjük át a kérés "body" paraméterében.</p>
                        <p>Amikor <b>form</b> paraméterről beszélek akkor pedig a "multipart/form-data" paramétereiről van szó.</p>
                    </div>
                </details>


                <hr />
                <details>
                    <summary>
                        <h2>/auth</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>POST /auth</h3>
                        <div className="card">
                            <p>A felhasználó bejelentkezéséért szolgál</p>
                            <p><b>Body</b>:</p>
                            <ul><b>username</b>: felhasználónév</ul>
                            <ul><b>password</b>: jelszó</ul>
                            <p><b>Válasz</b>: Token, ez set-cookie-val be is kerül a sütik közzé</p>
                        </div>
                    </div>
                    <div>
                        <h3>GET /auth 👤</h3>
                        <div className="card">
                            <p>A belépett felhasználó adatit írja ki</p>
                            <p><b>Válasz</b>: Objektum</p>
                            <pre>
                                {format(
                                    {
                                        "user": {
                                            "id": "ID",
                                            "name": "Felhasználónév",
                                            "created": "Létrehozás idő",
                                            "description": "Leírás",
                                            "picturePath": "Profilkép"
                                        }
                                    }
                                )}[]
                            </pre>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/feed</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /feed 👤</h3>
                        <div className='card'>
                            <p>A bejelentkezett felhasználó bejegyzéslistája. Ez lehetőseg "oldalakra" van tördelve</p>
                            <p><b>Paraméterek</b>:</p>
                            <ul><b>page</b>: oldal száma (alapból:0)</ul>
                            <ul><b>max</b>: egy oldalon mennyi bejegyzés legyen (alapból:20) (-1 megadása esetén mindent kiír)</ul>
                            <p><b>Válasz</b>: Objektum tömb</p>
                            <pre>
                                {format(
                                    {
                                        "id": "ID",
                                        "rating": "Értékelés 1-5",
                                        "description": "Értéklés szövege",
                                        "createDate": "Értéklés létrehozásának dátuma",
                                        "author": {
                                            "id": "Szerző ID",
                                            "name": "Fehasználónév",
                                            "picturePath": "Profilkép"
                                        },
                                        "movie": {
                                            "id": "Értékelt film ID",
                                            "name": "Film név",
                                            "genres": ["Műfaj tömb"],
                                            "imagePath": "Film borítókép"
                                        }
                                    }
                                )}[]
                            </pre>
                            <div className='code'>
                                <span>/api/feed?page=0&max=1</span>
                                <pre>{
                                    format({
                                        "feed": [
                                            {
                                                "id": 12,
                                                "rating": 5,
                                                "description": "Nagyon ajánlom mindenkinek!",
                                                "createDate": "2023-04-12T18:17:27.000Z",
                                                "author": {
                                                    "id": 1,
                                                    "name": "admin",
                                                    "picturePath": "/image/user/default.png"
                                                },
                                                "movie": {
                                                    "id": 82,
                                                    "name": "Your Name.",
                                                    "genres": [],
                                                    "imagePath": "/image/movie/012b2a66-a3b6-416c-bd05-9a176e4c4f78.jpg"
                                                }
                                            }
                                        ]
                                    })}
                                </pre>
                            </div>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/genre</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /genre</h3>
                        <div className='card'>
                            <p>Összes műfaj kilistázva</p>
                            <p><b>Válasz</b>: Objektum tömb {format({ "id": "ID", "name": "Név" })}[]</p>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/movie</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        TODO
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/permission</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /permission 👤</h3>
                        <div className='card'>
                            <p>A belépett fiók jogi szintjét adja vissza</p>
                            <p><b>Válasz</b>: Objektum {format({ "level": "Szint" })}</p>
                        </div>
                    </div>
                    <div>
                        <h3>GET /permission?all=true</h3>
                        <div className='card'>
                            <p>Az összes lehetséges jogi szint listázása</p>
                            <p><b>Válasz</b>: Objektum tömb {format({ "id": "ID", "name": "Név", "level": "Szint" })}[]</p>
                        </div>
                    </div>
                    <div>
                        <h3>PUT /permission 🛠️</h3>
                        <div className='card'>
                            <p>Más fiókok jogi szintjének változatása</p>
                            <p><b>Paraméterek</b>:</p>
                            <ul><b>whom</b>: melyik felhasználót akarjuk módosítani</ul>
                            <ul><b>permID</b>: milyen szinte akarjuk emelni</ul>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/review</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        TODO
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/search</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        <h3>GET /search</h3>
                        <div className='card'>
                            <p>A keresett szövegre hasonló felhasználókat és filmek listázza</p>
                            <p><b>Paraméterek</b>:</p>
                            <ul><b>name</b>: a keresés szövege</ul>
                            <p><b>Válasz</b>: Objektum tömb {format({ "id": "ID", "name": "Név", "picture": "Kép", "type": "Felhasználó vagy film" })}[]</p>
                            <p><b>Példa</b>:</p>
                            <div className='code'>
                                <span>/api/search?name=12</span>
                                <pre>{
                                    format([
                                        { "id": 3, "name": "123456789012345678901234567890", "picture": null, "type": "user" },
                                        { "id": 5, "name": "12 Angry Men", "picture": "78e437e3-1050-4542-ab72-00a5e897e446.jpg", "type": "movie" },
                                    ])}
                                </pre>
                            </div>
                        </div>
                    </div>
                </details>
                <details>
                    <summary>
                        <h2>/user</h2>
                        <hr />
                        <span className="icon">👇</span>
                    </summary>
                    <div>
                        TODO
                    </div>
                </details>
            </div>
        </Layout >
    )
}

export default DevPage
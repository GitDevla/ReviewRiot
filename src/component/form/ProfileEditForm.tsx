import { UserModel } from '@/model/UserModel';
import { Fetch } from '@/util/frontend/Fetch';
import { getLoggedIn, resetCache } from '@/util/frontend/getLoggedIn';
import { validateUsername } from '@/validator/userValidator';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import style from "@/styles/editForm.module.scss"

function ProfileEditForm() {
    const [user, setUser] = useState({} as UserModel);
    const [errorMessage, setErrorMessage] = useState('');
    const [previewPath, setPreviewPath] = useState(user?.picturePath)

    const newImage = useRef(null as File | null);
    const newUsername = useRef(null as string | null);
    const newPassword = useRef(null as string | null);
    const oldPassword = useRef(null as string | null);
    const newDescription = useRef(null as string | null);


    const fileInput = useRef(null as HTMLInputElement | null);
    useEffect(() => {
        getLoggedIn().then(i => {
            setUser(i);
            setPreviewPath(i.picturePath);
        }).catch(() => router.push("/auth"));
    }, [])

    const testOldPasword = async () => (await Fetch.POST('/api/auth', { username: user.name, password: oldPassword.current })).ok;


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendRequest().catch(i =>
            setErrorMessage(i.message));
    }

    const sendRequest = async () => {
        const body = new FormData();
        if (newPassword.current) {
            if (!(await testOldPasword()))
                throw Error("A régi jelszó nem egyezik meg");
            body.append("password", newPassword.current!);
        }
        if (newImage.current) {
            if (newImage.current.size > 1024 * 1024)
                throw Error("A kép túl nagy");

            body.append("file", newImage.current);
        }
        if (newDescription.current) {
            body.append("description", newDescription.current);
        }
        if (newUsername.current) {
            validateUsername(newUsername.current);
            body.append("username", newUsername.current);
        }
        const res = await fetch("/api/user/update", {
            method: "PUT",
            body
        });
        if (!res.ok)
            throw Error((await res.json()).error);
        resetCache();
    };

    async function setImage(file: File) {
        if (!file) return;

        const objectUrl = URL.createObjectURL(file)
        setPreviewPath(objectUrl);
        newImage.current = file;
    }

    return (
        <form className={style.form} onSubmit={handleSubmit} encType="multipart/form-data">
            <div style={{ float: "right", width: "18%", aspectRatio: "1" }}>
                <label>Profilkép</label><br />
                <div className={style.image_change} onClick={() => fileInput.current?.click()}>
                    <div className={style.hover_inside}>
                        <label>Kép feltötése</label>
                        <input type="file" ref={fileInput} accept="image/*" onChange={i => setImage(i.target.files![0])} hidden />
                    </div>
                    <img src={previewPath} width={100} height={100} className={"round"} />
                </div>
            </div>
            <div>
                <label>Fehasználónév</label><br />
                <input type="text" placeholder='Fehasználónév' defaultValue={user?.name} onChange={i => newUsername.current = i.target.value} />
            </div>
            <div>
                <label>Jelszó változtatás</label><br />
                <input type="password" placeholder='Jelenlegi jelszó' onChange={i => oldPassword.current = i.target.value} />
                <input type="password" placeholder='Új jelszó' onChange={i => newPassword.current = i.target.value} />
            </div>

            <div>
                <label>Leírás</label><br />
                <textarea defaultValue={user?.description ?? ""} rows={5} onChange={i => newDescription.current = i.target.value}></textarea>
            </div>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Mentés" />
            <input type="submit" onClick={() => router.reload()} value="Mégse" />
        </form>
    )
}

export default ProfileEditForm
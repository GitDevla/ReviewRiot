import { UserModel } from '@/model/UserModel';
import { Fetch } from '@/util/frontend/Fetch';
import { resetCache, useUser } from '@/util/frontend/useUser';
import { validateUsername } from '@/validator/userValidator';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react'

function ProfileEditForm() {
    const [user, setUser] = useState({} as UserModel);
    const [errorMessage, setErrorMessage] = useState('');
    const [previewPath, setPreviewPath] = useState(user?.picturePath)

    const newImage = useRef(null as File | null);
    const newUsername = useRef(null as string | null);
    const newPassword = useRef(null as string | null);
    const oldPassword = useRef(null as string | null);
    const newDescription = useRef(null as string | null);

    useEffect(() => {
        async function getUserData() {
            const data = await useUser();
            setUser(data!);
            setPreviewPath(data!.picturePath);
        }

        getUserData().catch(() => router.push("/auth"));
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
            body.append("file", newImage.current);
        }
        if (newDescription.current) {
            body.append("description", newDescription.current);
        }
        if (newUsername.current) {
            validateUsername(newUsername.current);
            body.append("username", newUsername.current);
        }
        await fetch("/api/user/update", {
            method: "PUT",
            body
        });
        resetCache();
    };

    async function setImage(file: File) {
        const objectUrl = URL.createObjectURL(file)
        setPreviewPath(objectUrl);
        newImage.current = file;
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Fehasználónév: </label>
                <input type="text" placeholder='Fehasználónév' defaultValue={user?.name} onChange={i => newUsername.current = i.target.value} />
            </div>
            <div>
                <label>Jelszó változtatás: </label>
                <input type="password" placeholder='Jelenlegi jelszó' onChange={i => oldPassword.current = i.target.value} />
                <input type="password" placeholder='Új jelszó' onChange={i => newPassword.current = i.target.value} />
            </div>
            <div>
                <label>Profilkép: </label>
                <input type="file" accept="image/*" onChange={i => setImage(i.target.files![0])} /><br />
                <img src={previewPath} width={100} height={100} className={"round"} />
            </div>
            <div>
                <label>Leírás: </label>
                <textarea defaultValue={user?.description ?? ""} onChange={i => newDescription.current = i.target.value}></textarea>
            </div>
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <input type="submit" value="Mentés" />
        </form>
    )
}

export default ProfileEditForm
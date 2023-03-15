import Layout from '@/component/Layout'
import { Fetch } from '@/util/Fetch';
import { PermissionLevel } from '@/util/PermissionLevels';
import React, { useEffect, useRef, useState } from 'react'
import { UserModel } from '@/model/UserModel';
import SettingsNavbar from '@/component/SettingsNavbar';
import { resetCache, useUser } from '@/util/useUser';
import { validateUsername } from '@/validator/userValidator';

function SettingsProfilePage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({} as UserModel);
    const [file, setFile] = useState(null as File | null);
    const [errorMessage, setErrorMessage] = useState('');
    const [previewPath, setPreviewPath] = useState(user?.picturePath)

    const newUsername = useRef(null as string | null);
    const newPassword = useRef(null as string | null);
    const oldPassword = useRef(null as string | null);
    const newDescription = useRef(null as string | null);

    useEffect(() => {
        async function getIsAdmin() {
            const res = await Fetch.GET("/api/permission");
            const json = await res.json();
            setIsAdmin(json.level >= PermissionLevel.admin)
        }

        useUser().then(i => { setUser(i!); return i }).then(i => setPreviewPath(i!.picturePath)).catch(i => alert("TODO"));
        getIsAdmin();
    }, [])

    const testOldPasword = async () => (await Fetch.POST('/api/auth', { username: user.name, password: oldPassword.current })).ok;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = new FormData();
        if (newPassword.current) {
            if (!(await testOldPasword()))
                return setErrorMessage("A régi jelszó nem egyezik meg");
            body.append("password", newPassword.current!);
        }
        if (file) {
            body.append("file", file);
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
        setFile(file);
    }

    return (
        <Layout>
            {isAdmin && <SettingsNavbar />}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Fehasználónév: </label>
                    <input type="text" placeholder='Fehasználónév' defaultValue={user.name} onChange={i => newUsername.current = i.target.value} />
                </div>
                <div>
                    <label>Jeleszó változtatás: </label>
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
                    <textarea defaultValue={user.description ?? ""} onChange={i => newDescription.current = i.target.value}></textarea>
                </div>
                {errorMessage && <p className='error'>{errorMessage}</p>}

                <input type="submit" value="Mentés" />
            </form>
        </Layout >
    )
}

export default SettingsProfilePage
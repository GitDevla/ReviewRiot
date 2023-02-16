import { UserModel } from "@/model/UserModel"

export const createNewUserService = async (username: string, email: string, password: string) => {
    let userWithSameName = await UserModel.getUserWithName(username);
    if (userWithSameName) throw new Error("Username Exists");
    let userWithSameMail = await UserModel.getUserWithMail(email);
    if (userWithSameMail) throw new Error("Email Exists");

    UserModel.createUser(username, email, password);
}
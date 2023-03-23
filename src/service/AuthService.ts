import { UserModel } from '@/model/UserModel';
import jwt from 'jsonwebtoken';

const jwtToken = process.env.JWT_TOKEN ?? "";

interface IToken {
    userId: number;
}

export const authUser = async (username: string, password: string) => {
    const user = await UserModel.getWithName(username);
    if (!user) return false;
    const res = await UserModel.auth(username, password);
    if (!res) return false;

    return generateToken(user.id);
}

export const generateToken = async (userID: number) => {
    const token = jwt.sign({ userId: userID }, jwtToken, { expiresIn: '90d' });
    return { token };
};

export const validateToken = async (token: string) => {
    try {
        const decodedToken = <IToken>jwt.verify(token, jwtToken);
        return decodedToken;
    } catch (error) {
        return null;
    }
};
import jwt from 'jsonwebtoken';

const jwtToken = process.env.JWT_TOKEN ?? "";

interface IToken {
    userId: number;
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
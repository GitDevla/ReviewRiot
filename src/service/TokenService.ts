import jwt from 'jsonwebtoken';

const jwtToken = "eea1d40c9b346123926abe048ea757974d142cf4fafd749e5c01c1a0abedfa21"

export const generateToken = async (userID: number) => {
    const token = jwt.sign({ userId: userID }, jwtToken, { expiresIn: '90d' });
    return { token };
};

export const validateToken = async (token: string) => {
    try {
        const decodedToken = jwt.verify(token, jwtToken);
        return decodedToken;
    } catch (error) {
        return null;
    }
};
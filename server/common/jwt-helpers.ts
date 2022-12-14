import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyJWT = async (accessToken: string): Promise<JwtPayload | string> => {
    try {
        return await jwt.verify(accessToken, process.env.SERVER_JWT_ACCESS_SECRET as string);
    } catch (error) {
        return 'Error verify token';
    }
}

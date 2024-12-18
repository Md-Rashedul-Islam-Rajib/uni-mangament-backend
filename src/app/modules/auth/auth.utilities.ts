import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../user/user.model';

export const createToken = (
    jwtPayload: { userId: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

export const verifyToken = (secret: string, token?: string) => {
    if (!token) {
        throw new Error(
            "You're not authorized"
        );
    }

    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (_error) {
        throw new Error(
            'The provided token is invalid or expired'
        );
    }
};


export const preValidatingUser = async (userId:string, iat?: number) => {
    const user = await UserModel.isUserExistsByCustomId(userId);
    if (!user) {
        throw new Error('this user is not found');
    }

    if (user?.isDeleted) {
        throw new Error('this user is deleted');
    }

    if (user.status === 'blocked') {
        throw new Error('this user is blocked'); 
    }

    if (user.passwordChangedAt && UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
        throw new Error('you are not authorized');
    }
    return user;

};
import jwt from 'jsonwebtoken';
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


};
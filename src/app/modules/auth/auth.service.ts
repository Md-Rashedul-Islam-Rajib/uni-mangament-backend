import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.types";
import { createToken, preValidatingUser } from "./auth.utilities";
import config from '../../config';

export class AuthServices {

    static async loginUser(payload: TLoginUser) {
        const user = await preValidatingUser(payload.id);

        const passwordMatched = await UserModel.isPasswordMatched(payload?.password, user?.password);
        
        if (!passwordMatched) {
            throw new Error('password did not matched');
        }

        const jwtPayload = {
            userId: user?.id,
            role: user?.role
        };

        const accessToken = createToken(
            jwtPayload,
            config.jwt_access_secret,
            config.jwt_access_expires_in
        );

        const refreshToken = createToken(
            jwtPayload,
            config.jwt_refresh_secret,
            config.jwt_refresh_expires_in,
        );

        return {
            accessToken,
            refreshToken,
            needsPasswordChange : user?.needsPasswordChange
        };
        
    };


























}
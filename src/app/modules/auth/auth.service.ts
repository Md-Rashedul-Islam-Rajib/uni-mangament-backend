import { JwtPayload } from 'jsonwebtoken';
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.types";
import { createToken, preValidatingUser } from "./auth.utilities";

export class AuthServices {

    static async loginUser(payload: TLoginUser) {
        const user = await preValidatingUser(payload.id);

        const passwordMatched = await UserModel.isPasswordMatched(payload?.password, user?.password);
        
        if (!passwordMatched) {
            throw new Error('password did not matched');
        }

        const JwtPayload = {
            userId: user?.id,
            role: user?.role
        };

        const accessToken = createToken(
            JwtPayload,
            conf
        );
        
    };


























}
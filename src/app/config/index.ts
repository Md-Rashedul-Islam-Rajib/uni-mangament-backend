import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env'),
});

export default {
    port: process.env.PORT as string,
    db_url: process.env.DB_URL as string,
    default_password: process.env.DEFAULT_PASSWORD as string,
    bcrypt_salt_rounds: process.env.SALT_ROUND as string,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
};

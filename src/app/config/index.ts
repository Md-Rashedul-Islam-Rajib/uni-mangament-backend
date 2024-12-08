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
};

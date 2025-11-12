import dotenv from 'dotenv';
dotenv.config();

const config = {
    databaseUrl : process.env.DATABASE_URL,
    port : process.env.PORT || 3000,
    jwtSecret : process.env.JWT_SECRET || 'secretkey',
    saltRounds : Number(process.env.SALT_ROUNDS) || 8
}

export default config;
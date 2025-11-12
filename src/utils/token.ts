import jwt from "jsonwebtoken";
import config from '../config/variables.js';

const generateToken = async (id: string): Promise<string> => {
    const token = await jwt.sign({ id }, config.jwtSecret)
    return token;
}

export { generateToken };
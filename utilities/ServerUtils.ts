import bcrypt from 'bcrypt';
import consola from "consola";
import jwt from 'jsonwebtoken';
import {H3Event} from "h3";
import {ServiceResult} from "~~/utilities/ServiceResult";
import path from "path";
import {fileURLToPath} from "node:url";
import {toBuffer} from "nitropack/runtime/utils";

export const serverUtils = {
    async hashPassword(userPassword: string): Promise<string> {
        try {
            const salt = 10; // salt rounds
            return await bcrypt.hash(userPassword, salt);
        } catch (err) {
            consola.error('Error when generating salt or hashing password:', err);
        }
    },
    async compare(plainPassword: string, userPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, userPassword);
    },
    generateToken(payload: unknown, expiresIn = process.env.JWT_EXPIRES_IN) {
        // @ts-ignore
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
    },
    verifyToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    },
    authorizeMiddleware(event: H3Event) {
        const operation = new ServiceResult()
        const authHeader = event.node.req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            operation.httpError('Authorization header missing or invalid', 401)
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = serverUtils.verifyToken(token);
            event.context.user = decoded; // Attach user info to the context
        } catch (error) {
            throw operation.httpError('Invalid or expired token', 401)
        }
    },
    getRootDir() {
        return path.join(fileURLToPath(import.meta.url), '../', '../', '../')
    },
    async createBuffer(file: File) {
        const arrayBuffer: any = await file.arrayBuffer()

        return toBuffer(arrayBuffer);

    },
    generateRandomName() {
        return new Date().getTime().toString()
    },
    generateOTP() {
        // Declare a digits variable
        // which stores all digits
        const digits = '0123456789';
        let OTP = '';
        const len = digits.length;
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * len)];
        }

        return OTP;
    },
    generateLink(): string {
        // Declare a digits variable
        // which stores all digits
        const digits = 'abcdefghijklmnopqrstuvwxyz';
        let link = '';
        const len = 8;
        for (let i = 0; i < 8; i++) {
            link += digits[Math.floor(Math.random() * len)];
        }

        return link;
    },
    paginatedQuery(page: number, limit: number): number {
        return (page - 1) * limit
    },
    parseWebsocketQueries(queries: string): object {
        const resultQueries = {}
        queries.split('&').map((query, idx) => {
            resultQueries[query.split('=')[0]] = query.split('=')[1]
        })
        return resultQueries
    }
}
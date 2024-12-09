import bcrypt from 'bcrypt';
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {ServiceResult} from "~~/utilities/ServiceResult";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {email, password} = body;
    const operation = new ServiceResult()

    if (!email || !password) {
        throw createError({statusCode: 400, message: 'Missing email or password'});
    }

    // Find the user by email
    const user = await prismaClient.user.findUnique({
        where: {email},
    });

    if (!user) {
        throw createError({statusCode: 401, message: 'Invalid email or password'});
    }

    // Verify the password
    const isPasswordValid = await serverUtils.compare(password, user.password);
    if (!isPasswordValid) {
        throw createError({statusCode: 401, message: 'Invalid email or password'});
    }

    // Generate JWT
    const token = serverUtils.generateToken({id: user.id, email: user.email});
    return operation.ok('Authorized', `Bearer ${token}`);
});

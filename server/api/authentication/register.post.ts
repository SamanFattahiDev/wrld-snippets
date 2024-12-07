import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {ServiceResult} from "~~/utilities/ServiceResult";
import {userService} from "~~/services/user";
import {storage} from "~~/storage";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const operation = new ServiceResult()
    const {email, password, username, verifyCode} = body;
    if (verifyCode) {
        const kyStorageCode = await storage.getItem(email)
        if (+kyStorageCode === +verifyCode) {
            // TODO Must handle unique email
            const currentUser = await prismaClient.user.findFirst({
                where: {email}
            })
            if (currentUser)
                return operation.failure('user already exists');
            const userData = {
                email,
                password: await serverUtils.hashPassword(password),
                username,
            }
            try {

                const user = await userService.createUser(userData);
                const token = serverUtils.generateToken({id: user.id, email: user.email});
                await useStorage().del(email)
                return operation.ok('user created', {
                    email: user.email,
                    username: user.username,
                    token: `Bearer ${token}`,
                })
            } catch (e) {
                return operation.failure(e)
            }

        } else {
            return operation.failure('code is wrong')
        }
    } else {
        return operation.failure('Missing verify code')
    }
});

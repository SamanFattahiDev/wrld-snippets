import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import {userService} from "~~/services/user";

export default defineEventHandler({
    onRequest:[(event)=>{
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        try {
            const body = await readBody(event);
            const userData = {
                email: body.email,
                password: await serverUtils.hashPassword(body.password),
                username: body.username,
            }
            const user = await userService.createUser(userData)
            return operation.ok('user created', user)
        } catch (e) {
            return operation.failure(e)
        }
    }
})
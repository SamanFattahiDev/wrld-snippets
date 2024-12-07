import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import {userService} from "~~/services/user";
import bcrypt from 'bcrypt';
import prismaClient from "~~/utilities/PrismaClient";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const userContext = event.context.user

        try {
            const user = await userService.findUserById(+userContext.id);
            if (user.inviteLink)
                return operation.ok('You Already Have An Invite Link')
            const generatedLink = serverUtils.generateLink()
            await prismaClient.user.update({
                where: {id: userContext.id},
                data: {
                    inviteLink: generatedLink
                }
            })
            return operation.ok('A New Link Has Been Generated', generatedLink)
        } catch (e) {
            return operation.failure(e)
        }
    }
})
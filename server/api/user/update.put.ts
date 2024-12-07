import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";

export default defineEventHandler({
    onRequest:[(event)=>{
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const prisma = prismaClient
        const query = getQuery(event)
        const body: any = await readBody(event);
        const user = await prisma.user.findUnique({
            where: {id: +query.id},
        });
        user.username = body.username
        user.email = body.email
        user.password = await serverUtils.hashPassword(body.password)
        try {
            await prisma.user.update({
                data: user,
                where: {id: +query.id},
            });
            return operation.ok('Operation Successful')
        } catch (e) {
            return operation.failure(e)
        }
    }
})
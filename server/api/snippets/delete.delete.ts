import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const prisma = prismaClient
        const query = getQuery(event)
        try {
            await prisma.snippet.delete({
                where: {id: +query.id},
            });
            return operation.ok('Operation Successful')
        } catch (e) {
            return operation.failure(e)
        }
    }
})
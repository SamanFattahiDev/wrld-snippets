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
        const body: any = await readBody(event);
        const organization = await prisma.organization.findUnique({
            where: {id: +query.id},
        });
        organization.name = body.name
        try {
            await prisma.organization.update({
                data: organization,
                where: {id: +query.id},
            });
            return operation.ok('Operation Successful')
        } catch (e) {
            return operation.failure(e)
        }
    }
})
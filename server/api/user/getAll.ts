import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";

export default defineEventHandler({
    handler: async (event) => {
        const operation = new ServiceResult()
        const prisma = prismaClient
        const query = getQuery(event);
        const totalUsers = await prisma.user.count();
        try {
            const users = await prisma.user.findMany({
                skip: serverUtils.paginatedQuery(+query.page, +query.limit) || 1,
                take: +query.limit || 10,
            });
            return operation.ok('Operation Successful', {data: users, totalCount: totalUsers} as any)
        } catch (e) {
            return operation.failure(e)
        }
    }
})
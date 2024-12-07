import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";

export default defineEventHandler({
    handler: async (event) => {
        const operation = new ServiceResult()
        const prisma = prismaClient
        const query = getQuery(event);
        const totalOrgs = await prisma.organization.count();
        try {
            const organizations = await prisma.organization.findMany({
                skip: serverUtils.paginatedQuery(+query.page, +query.limit) || 0,
                take: +query.limit || 10,
            });
            return operation.ok('Operation Successful', {data: organizations, totalCount: totalOrgs} as any)
        } catch (e) {
            return operation.failure(e)
        }
    }
})
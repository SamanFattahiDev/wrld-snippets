import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";

export default defineEventHandler({
    handler: async (event) => {
        const operation = new ServiceResult()
        const prisma = prismaClient
        const query = getQuery(event);
        const totalSnippets = await prisma.snippet.count();

        try {
            const snippets = await prisma.snippet.findMany({
                skip: (+query.page - 1) * +query.limit || 1,
                take: +query.limit || 10,
            });
            return operation.ok('Operation Successful', {data: snippets, totalCount: totalSnippets} as any)
        } catch (e) {
            return operation.failure(e)
        }
    }
})
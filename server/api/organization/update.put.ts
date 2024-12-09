import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";
import prisma from "~~/utilities/PrismaClient";
import {userService} from "~~/services/user";

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
        const user = await userService.findUserById(event.context.user.id)
        if (user.organization !== organization.id)
            return operation.httpError('unauthorized access:organization does not belong to you');
        if (organization) {
            try {
                await prisma.organization.update({
                    data: {
                        name: body.name,
                    },
                    where: {id: +query.id},

                });
                await prisma.user.update({
                    where: {
                        id: event.context.user.id
                    },
                    data: {
                        organization: {
                            connect: {
                                id: organization.id
                            }
                        }
                    }
                })
                return operation.ok('Operation Successful')
            } catch (e) {
                return operation.failure(e)
            }
        } else {
            return operation.failure('organization not found')

        }
    }
})
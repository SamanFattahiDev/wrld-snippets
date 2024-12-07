import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import {userService} from "~~/services/user";
import {organizationService} from "~~/services/organizationService";
import prisma from "~~/utilities/PrismaClient";
import prismaClient from "~~/utilities/PrismaClient";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const body = await readBody(event)
        if (body.organizationId && event.context.user) {
            try {
                const organization = await organizationService.findOrganizationById(+body.organizationId);
                const user = await userService.findUserById(+event.context.user.id)
                await prismaClient.user.update({
                    where: {id: +user.id},
                    data: {
                        organization: organization.id
                    }
                })
                return operation.ok('user append to organization')
            } catch (e) {
                return operation.failure(e)
            }
        } else {
            return operation.httpError('missing org id or user', 403)
        }
    }
})
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
        const affiliateUser = await userService.findUserByLink(body.inviteLink)
        if (affiliateUser) {
            const affiliateUserOrganization = await organizationService.findOrganizationById(affiliateUser.organization)
            if (affiliateUserOrganization) {
                const currentUser = await userService.findUserById(event.context.user.id)
                if (!currentUser.organization) {
                    await prismaClient.user.update({
                        where: {id: currentUser.id},
                        data: {
                            organization: affiliateUserOrganization.id
                        }
                    })
                    return operation.ok(`You Have Successfully Joined ${affiliateUserOrganization.name}`)

                } else {
                    return operation.failure('User Already Assigned To An Organization')
                }
            } else {
                return operation.failure('Organization Not Found')
            }
        } else {
            return operation.failure('Affiliate User Not Found')
        }
        try {

        } catch (e) {
            return operation.failure(e)
        }

    }
})
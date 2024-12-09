import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import prismaClient from "~~/utilities/PrismaClient";
import {mediaService} from "~~/services/media";
import {mediaTypes} from "~~/models/media";
import prisma from "~~/utilities/PrismaClient";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        try {
            const body = await readFormData(event);
            let mediaName: string = ''
            const currentOrg = await prismaClient.organization.findFirst({
                // @ts-ignore
                where: {name: body.get('name')}
            })
            if (currentOrg)
                return operation.failure('organization exists', 400)
            if (body.get('file')) {
                mediaName = await mediaService.createMedia(body.get('file'))
            }
            const orgData = {
                name: body.get('name'),
                picture: mediaName ? mediaName : null,
            }
            const org = await prismaClient.organization.create({
                // @ts-ignore
                data: orgData
            })
            await mediaService.createMediaEntity({name: org.name, objectId: org.id, type: mediaTypes.organization})
            await prisma.user.update({
                where: {
                    id: event.context.user.id
                },
                data: {
                    organization: {
                        connect: {id: org.id}
                    }
                }
            })
            return operation.ok('organization created', {
                id: org.id,
                name: org.name,
                picture: org.picture,
            })

        } catch (e) {
            return operation.failure(e)
        }
    }
})
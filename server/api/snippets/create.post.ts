import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import prismaClient from "~~/utilities/PrismaClient";
import {mediaService} from "~~/services/media";
import {mediaTypes} from "~~/models/media";
import {organizationService} from "~~/services/organizationService";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const body = await readBody(event);
        try {
            const snippet = await prismaClient.snippet.create({
                data: {
                    title: body.title,
                    content: body.content,
                    userId: event.context.user.id
                }
            })
            await useStorage('cache').removeItem('nitro:functions:snippets:default.json')
            return operation.ok('Snippet created', snippet)

        } catch (e) {
            return operation.failure(e)
        }
    }
})
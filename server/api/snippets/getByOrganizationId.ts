import {ServiceResult} from "~~/utilities/ServiceResult";
import prismaClient from "~~/utilities/PrismaClient";
import {serverUtils} from "~~/utilities/ServerUtils";
import {IUserGetbyDTO} from "~~/models/user";
import {userService} from "~~/services/user";
import {cachedSnippets} from "~~/services/snippetsService";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const query = getQuery(event);
        let snippets = []
        const userContext = await userService.findUserById(event.context.user.id)
        if (userContext.organization == +query.organizationId) {
            snippets = await cachedSnippets(+query.organizationId)
            return operation.ok('Operation Successful', {data: snippets, totalCount: snippets.length} as any)
        } else {
            return operation.httpError('UnAuthorized Access', 403)
        }
    }
})
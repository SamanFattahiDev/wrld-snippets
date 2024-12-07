import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import {userService} from "~~/services/user";
import {organizationService} from "~~/services/organizationService";

export default defineEventHandler({
    onRequest: [(event) => {
        serverUtils.authorizeMiddleware(event)
    }],
    handler: async (event) => {
        const operation = new ServiceResult()
        const query = getQuery(event)
        try {
            const organization = await organizationService.findOrganizationById(+query.id);
            return operation.ok('Operation Successful', organization)
        } catch (e) {
            return operation.failure(e)
        }
    }
})
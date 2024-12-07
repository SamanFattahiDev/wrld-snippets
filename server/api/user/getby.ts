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
        let userOrganization = null
        try {
            const user = await userService.findUserById(+query.id);
            if (user.organization)
                userOrganization = await organizationService.findOrganizationById(+user.organization);
            return operation.ok('Operation Successful', {...user, organization: userOrganization})
        } catch (e) {
            return operation.failure(e)
        }
    }
})
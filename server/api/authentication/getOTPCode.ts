import {ServiceResult} from "~~/utilities/ServiceResult";
import {serverUtils} from "~~/utilities/ServerUtils";
import {storage} from "~~/storage";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const operation = new ServiceResult()
    if (query.email) {
        try {
            const generatedCode = serverUtils.generateOTP()
            // @ts-ignore
            await storage.setItem(query.email, generatedCode)
            return operation.ok(`your code is ${generatedCode}`);
        } catch (e) {
            return operation.failure(e);
        }
    } else {
        return operation.failure('please insert your email');
    }
});

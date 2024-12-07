interface IServiceResult {
    message: string;
    isSuccess: boolean;
    data: unknown;
    statusCode?: number;
}

export class ServiceResult {
    constructor() {
    }

    ok(message: string, data?: unknown): IServiceResult {
        return {
            isSuccess: true,
            message,
            data,
            statusCode: 200
        }
    }

    failure(message: string, data?: unknown, statusCode?: number): IServiceResult {
        return {
            isSuccess: false,
            message,
            data,
            statusCode: statusCode | 500
        }
    }

    httpError(message: string, statusCode?: number, data?: unknown): any {
        throw createError({statusCode: statusCode | 500, message: message})
    }
}
import prismaClient from "~~/utilities/PrismaClient";
import {ICreateUserPayload, IUserGetbyDTO} from "~~/models/user";
import {User} from "@prisma/client";

export const userService = {
    async createUser(userPayload: ICreateUserPayload) {
        try {
            return await prismaClient.user.create({
                data: userPayload,
            })
        } catch (e) {
            throw e
        }
    },
    async findUserById(id: number): Promise<IUserGetbyDTO> {
        try {
            const user = await prismaClient.user.findUnique({
                where: {id},
            });
            return {
                id: user.id,
                email: user.email,
                username: user.username,
                organization: user.organizationId,
                inviteLink: user.inviteLink
            } as IUserGetbyDTO
        } catch (e) {
            throw e
        }
    },

    async findUserByLink(inviteLink: string): Promise<IUserGetbyDTO> {
        try {
            const user = await prismaClient.user.findFirst({
                where: {inviteLink},
            });
            return {
                id: user.id,
                email: user.email,
                username: user.username,
                organization: user.organizationId,
                inviteLink: user.inviteLink
            } as IUserGetbyDTO
        } catch (e) {
            throw e
        }
    }
}
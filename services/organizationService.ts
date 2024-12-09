import {IUserGetbyDTO} from "~~/models/user";
import prismaClient from "~~/utilities/PrismaClient";

export const organizationService = {
    async findOrganizationById(id: number): Promise<IOrganization> {
        try {
            const organization = await prismaClient.organization.findUnique({
                where: {id},
            });
            return {
                id: organization.id,
                name: organization.name,
                picture: organization.picture
            } as IOrganization
        } catch (e) {
            throw e
        }
    }
}
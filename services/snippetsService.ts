import prismaClient from "~~/utilities/PrismaClient";

export const cachedSnippets = defineCachedFunction(async (organizationId: number) => {
    const snippets = []
    const organizationUsers = await prismaClient.user.findMany({
        where: {organization: organizationId},
        select: {
            id: true,
            organization: false,
            username: true,
            email: true,
            inviteLink: false,
            password: false,
            isDeleted: false,
            createdAt: false,
            referralCounts: false
        }
    })
    for (const user of organizationUsers) {
        const userSnippets = await prismaClient.snippet.findMany({
            where: {userId: user.id}, select: {
                id: true,
                userId: false,
                createdAt: false,
                isDeleted: false,
                content: true,
                title: true
            }
        })
        userSnippets.map((snippet) => {
            snippets.push({
                ...snippet,
                user
            })
        })
    }

    return snippets
}, {
    maxAge: 60 * 60, // 1 hour max age is in seconds,
    name: 'snippets',
    getKey: () => 'default'
})
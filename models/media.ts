const mimeInfos = {
    'image/': {
        type: 1,
        path: '/images'
    },
    'video/': {
        type: 2,
        path: '/videos'
    },
    'application/': {
        type: 3,
        path: '/files'
    },
}

interface ICreateMediaPayload {
    name: string,
    objectId: number,
    type:   mediaTypes
}

enum mediaTypes {
    'organization' = 1
}

export {mimeInfos,ICreateMediaPayload,mediaTypes}
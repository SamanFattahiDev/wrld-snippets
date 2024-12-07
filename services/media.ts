import path from "path";
import fs from "fs";
import {ICreateMediaPayload, mimeInfos} from "~~/models/media";
import {serverUtils} from "~~/utilities/ServerUtils";
import {toBuffer} from "nitropack/runtime/utils";
import prismaClient from "~~/utilities/PrismaClient";

export const mediaService = {
    async createMedia(file: any): Promise<string> {
        const mediaDir = path.join(serverUtils.getRootDir(), `Media${this.getMediaType(file.type).path}`);
        fs.mkdirSync(mediaDir, {recursive: true})
        const randomName = `${serverUtils.generateRandomName()}.${file.name.split('.')[1]}`;
        const filePath = path.join(mediaDir, randomName);
        fs.writeFileSync(filePath, await serverUtils.createBuffer(file));
        return randomName

        // let currentMediaType = this.getMediaType(file.type).type
        // if (currentMediaType === 1) {
        //     await convertToWebp(req.file)
        // } else {
        //     await saveInDestination(req.file)
        // }
    },
    async createMediaEntity(mediaPayload: ICreateMediaPayload) {
        try {
            return await prismaClient.media.create({
                // @ts-ignore
                data: mediaPayload,
            })
        } catch (e) {
            throw e
        }
    },
    getMediaType(mimeType) {
        let mediaType = null;
        Object.keys(mimeInfos).forEach((key) => {
            if (mimeType.includes(key)) {
                mediaType = mimeInfos[key]
            }
        })
        return mediaType
    },

    async convertToWebp(file) {
        // const webpBuffer = await sharp(file.buffer)
        //     .resize(200)
        //     .toBuffer()
        // file.buffer = webpBuffer
        // const splitedName = file.originalname.split('.')
        // file.originalname = `${splitedName[0]}.webp`
        // saveInDestination(file)
    },
}
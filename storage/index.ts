import {createStorage} from "unstorage";

// TODO Connect redis
// import redisDriver from "unstorage/drivers/redis";
//
// const storage = createStorage({
//     driver: redisDriver({
//         base: "unstorage",
//         host: 'localhost',
//         tls: true as any,
//         port: 3000,
//         password: 'REDIS_PASSWORD'
//     }),
// });
// export {storage}

export const storage = createStorage({})
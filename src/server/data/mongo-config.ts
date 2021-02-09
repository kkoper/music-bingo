import { ConnectionOptions } from "typeorm";

export const mongoConfig = {
   "type": "mongodb",
   "host": process.env.mongoHost as string,
   "port": process.env.mongoPort as unknown as number,
   "username": process.env.mongoUser,
   "password": process.env.mongoPass,
   synchronize: true,
   logging: true,
   sslCA: [process.env.SSL_CERT],
   entities: ["dist/server/data/entities/*.js"]
} as ConnectionOptions;
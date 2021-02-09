import { config } from "dotenv";
config();
import "reflect-metadata";
import { callbackify } from "util";
import { startServer } from "./server";

callbackify(startServer)
((error) => {
    if(error){
        throw error;
    }
    console.log("server startup complete");
});


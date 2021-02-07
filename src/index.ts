import { config } from "dotenv";
import { callbackify } from "util";
import { startServer } from "./server";

config();

callbackify(startServer)
((error) => {
    if(error){
        throw error;
    }
    console.log("server startup complete");
});


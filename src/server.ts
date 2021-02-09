

import express from "express";
import serveStatic from "serve-static";
import {join} from "path";
import {getBingoCard, getPlaylist, setPlaylist } from "./server/playlist";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import { getCurrentTrack, getSession, nextTrack, startSession } from "./server/session";
import {createConnection} from "typeorm";
import { mongoConfig } from "./server/data/mongo-config";
import { deleteSession } from "./server/data/session.repository";

export async function startServer() {
    const app =  express();

    await createConnection(mongoConfig);
    app.use(morgan("combined"));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    app.post("/api/playlist", asyncHandler(setPlaylist));
    app.get("/api/playlist", asyncHandler(getPlaylist));
    app.get("/api/playlist/bingocard", asyncHandler(getBingoCard));

    app.get("/api/session", asyncHandler(getSession));
    app.delete("/api/session", asyncHandler(deleteSession));
    app.post("/api/session", asyncHandler(startSession));
    app.post("/api/session/nextTrack", asyncHandler(nextTrack));
    app.get("/api/session/currentTrack", asyncHandler(getCurrentTrack));

    app.use(serveStatic(join(__dirname, "client"), {
        index: ["index.html"]
    }));

    app.listen(8080);
    console.log("Express server served at 8080");
}


function asyncHandler(handler: (req: express.Request, res: express.Response, next?: express.NextFunction) => Promise<void>){
    return async function(req: express.Request, res: express.Response, next: express.NextFunction){
        try{
            await handler(req, res, next);
        } catch(e){
            next(e);
        }
    };
}


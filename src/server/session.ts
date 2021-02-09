import { randomInt } from "crypto";
import express from "express";
import { getCurrentSession, saveCurrentTrack, deleteSession } from "./data/session.repository";

export async function startSession(_req: express.Request, res: express.Response){
    const currentSessions = await getCurrentSession();

    const randomIndex = randomInt(0, currentSessions.tracks.length);
    const nextTrack = currentSessions.tracks[randomIndex];
    const session = saveCurrentTrack(nextTrack);
    res
        .status(201)
        .json(session);

    return;
}

export async function getSession(_req: express.Request, res: express.Response){
    const session = await getCurrentSession();
    if(!session){
        res
            .status(404)
            .send("Session not found");
        return;
    }

     res
        .status(200)
        .json(session);
    return;
}

export async function nextTrack(_req: express.Request, res: express.Response){
    const session = await getCurrentSession();
    const availableSongs = session
        .tracks
        .filter(t => undefined === session.playedSongs.find(ps => ps.id == t.id));

    const randomIndex = randomInt(0, availableSongs.length);
    const newTrack = availableSongs[randomIndex];
    saveCurrentTrack(newTrack);

    res
        .status(201)
        .json(newTrack);
        
    return;
}

export async function getCurrentTrack(_req: express.Request, res: express.Response){
    const session = await getCurrentSession();
    if(!session){
        res
        .status(409)
        .send("no session");
        return;
    }

    res
        .status(200)
        .json(session.currentTrack);
}

export async function replayTrack(){
    throw new Error("not implemented");}

export async function endSession(_req: express.Request, res: express.Response){
    await deleteSession();

    res
        .status(204)
        .send();
}
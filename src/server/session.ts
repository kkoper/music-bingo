import { randomInt } from "crypto";
import { getCurrentPlaylistId, getCurrentSession, insertSession, saveCurrentTrack } from "./local-storage";
import { getPlaylistInformation } from "./spotify";
import express from "express";

export async function startSession(_req: express.Request, res: express.Response){
    const currentPlaylistId = await getCurrentPlaylistId();
    const playlistInformation = await getPlaylistInformation(currentPlaylistId);

    const randomIndex = randomInt(0, playlistInformation.tracks.length);
    const nextTrack = playlistInformation.tracks[randomIndex];

    const session = insertSession(currentPlaylistId, nextTrack);
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
    const playlistInformation = await getPlaylistInformation(session.playlistId);
    const availableSongs = playlistInformation
        .tracks
        .filter(t => session.playedSongs.find(ps => ps.id != t.id));

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

export async function endSession(){
    throw new Error("not implemented");}
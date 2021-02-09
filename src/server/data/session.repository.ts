import {getRepository} from "typeorm";
import { BingoTrack } from "./entities/bingo-track";
import { Session } from "./entities/session";


export async function getCurrentSession(): Promise<Session | undefined>{
    const repo = getRepository(Session);
    return await repo.findOne();
}

export async function insertSession(playlistId: string, tracks: BingoTrack[]): Promise<Session> {
    await deleteSession();
    const newSession = {
        playlistId: playlistId,
        playedSongs: [] as BingoTrack[],
        tracks: tracks
    };

    const repo = getRepository(Session);
    return await repo.save(newSession);
}

export async function deleteSession(): Promise<void> {
    const currentSession = await getCurrentSession();
    if(currentSession){
        const repo = getRepository(Session);
        await repo.delete(currentSession);
    }
}


export async function saveCurrentTrack(currentTrack: BingoTrack): Promise<Session>{
    const session = await getCurrentSession();
    if(!session){
        throw new Error("no session");
    }
    session.playedSongs.push(currentTrack);
    session.currentTrack = {
        track: currentTrack,
        plays: 1
    };
    const repo = getRepository(Session);
    return await repo.save(session);
}
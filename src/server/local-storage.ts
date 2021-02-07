import { BingoSession } from "./models/bingo-session";
import { BingoTrack } from "./models/bingo-track";

let currentPlaylist: string | undefined;
let currentSession: BingoSession | undefined;

export function saveCurrentPlaylist(playlistId: string): Promise<void>{
    currentPlaylist = playlistId;
    return Promise.resolve();
}


export function getCurrentPlaylistId(): Promise<string>{
    return Promise.resolve(currentPlaylist);
}

export async function insertSession(playlistId: string, firstTrack: BingoTrack): Promise<BingoSession> {
    await deleteSession();
    currentSession = {
        playlistId: playlistId,
        playedSongs: [],
        currentTrack: {
            track: firstTrack,
            plays: 1
        }
    };

    currentSession.playedSongs.push(firstTrack);
    return Promise.resolve(currentSession);
}

export async function getCurrentSession(): Promise<BingoSession | undefined>{
    return Promise.resolve(currentSession);
}

export async function saveCurrentTrack(currentTrack: BingoTrack): Promise<void>{
    const session = await getCurrentSession();
    if(!session){
        throw new Error("no session");
    }
    console.log("session.playedSongs", session.playedSongs);

    session.playedSongs.push(currentTrack);
    session.currentTrack = {
        track: currentTrack,
        plays: 1
    };

    return Promise.resolve();
}

export async function incrementCurrentTrackPlays(): Promise<void>{
    const session = await getCurrentSession();
    if(!session){
        throw new Error("no session");
    }

    ++session.currentTrack.plays;
    return Promise.resolve();
}

export async function deleteSession(): Promise<void> {
    currentSession = undefined;
    return Promise.resolve();
}
import { BingoTrack } from "./bingo-track";

export interface BingoSession {
    playlistId: string,
    playedSongs: BingoTrack[],
    currentTrack: {
        track: BingoTrack,
        plays: number
    }
}


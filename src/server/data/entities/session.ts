import {Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { BingoTrack } from "./bingo-track";
import { CurrentTrack } from "./current-track";

@Entity()
export class Session {

    @ObjectIdColumn()
    id: ObjectID;

    @Column(() => BingoTrack)
    playedSongs: BingoTrack[];

    @Column(() => CurrentTrack)
    currentTrack?: CurrentTrack;

    @Column(() => BingoTrack)
    tracks: BingoTrack[];
}



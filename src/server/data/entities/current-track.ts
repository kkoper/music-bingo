import { Column } from "typeorm";
import { BingoTrack } from "./bingo-track";

export class CurrentTrack {
    @Column()
    plays: number;

    @Column(() => BingoTrack)
    track: BingoTrack;
}

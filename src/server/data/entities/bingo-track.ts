import { Column } from "typeorm";

export class BingoTrack {

    @Column()
    id: string;
    // image: string, todo
    @Column()
    title: string;

    @Column()
    artists: string[];

    @Column()
    previewUrl: string;
}

import { Request, Response } from "express";
import { insertSession, getCurrentSession } from "./data/session.repository";
import { getPlaylistInformation } from "./spotify";

export async function setPlaylist(req: Request, res: Response) {
    console.log("new playlist");
    if(!req.body.playlistId){
        res.status(400).send("playlistId required");
        return;
    }

    //todo type body
    const playlistId = req.body.playlistId as string;
    const currentPlaylist = await getPlaylistInformation(playlistId);

    await insertSession(playlistId, currentPlaylist.tracks);
    res.status(204).send();
    return;
}

export async function getPlaylist(_req: Request, res: Response){
    const session = await getCurrentSession();
    res
      .status(200)
      .json(session.tracks);
}

export async function getBingoCard(_req: Request, res: Response){
  const session = await getCurrentSession();
  const shuffledPlaylist = shuffle(session.tracks);
  // const artists = 
  //   shuffledPlaylist
  //   .filter(t => t.artists.length === 1)
  //   .splice(0, 5)
  //   .map(t => t.artists[0]);

  const songAndArtists =
    shuffledPlaylist
    .splice(0, 25)
    .map(s => `${s.title} - ${s.artists[0]}`);

    res
    .status(200)
    .json({ boxes: songAndArtists });

  return;
}

//Durstenfeld shuffle
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
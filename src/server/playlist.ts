import { Request, Response } from "express";
import { getCurrentPlaylistId, saveCurrentPlaylist } from "./local-storage";
import { getPlaylistInformation } from "./spotify";

export async function setPlaylist(req: Request, res: Response) {
    console.log("new playlist");
    if(!req.body.playlistId){
        res.status(400).send("playlistId required");
        return;
    }
    //todo validate playlist id is correct

    //todo type body
    await saveCurrentPlaylist(req.body.playlistId as string);
    res.status(204).send();
    return;
}

export async function getPlaylist(_req: Request, res: Response){
    const playlistId = await getCurrentPlaylistId();
    const currentPlaylist = await getPlaylistInformation(playlistId);
    res
      .status(200)
      .json(currentPlaylist);
}

export async function getBingoCard(_req: Request, res: Response){
  const playlistId = await getCurrentPlaylistId();
  const currentPlaylist = await getPlaylistInformation(playlistId);

  const shuffledPlaylist = shuffle(currentPlaylist.tracks);
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
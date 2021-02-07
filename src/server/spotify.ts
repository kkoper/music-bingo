import SpotifyWebApi from "spotify-web-api-node";
import { BingoTrack } from "./models/bingo-track";
import { getPlaylist } from "./playlist";



async function GetSpotifyClient(){
    //implement cachning based on expirytoken
    console.log(process.env.spotifyClientId);
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.spotifyClientId,
        clientSecret: process.env.spotifyClientSecret
      });
  
    const data = await  spotifyApi.clientCredentialsGrant();
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);
  
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body["access_token"]);
  
    return spotifyApi;
  }

export async function getPlaylistInformation(playlistId: string) {
    const client = await GetSpotifyClient();
    const playlistResponse = await client.getPlaylist(playlistId, {
        market: "NL"
    });
    const tracksResponse = await client.getPlaylistTracks(playlistId, {
        market: "NL"
    });

    return {
        playlist: playlistResponse?.body,
        tracks: tracksResponse?.body?.items
            .map(mapTrack)
            .filter(t => t.previewUrl)
      };
}

function mapTrack(itemFromSpotify: any): BingoTrack {
    const track = itemFromSpotify.track;
    return {
        id: track?.id,
        artists: track?.artists?.map((a: { name: string; }) => a.name),
        previewUrl: track?.preview_url,
        title: track?.name
    };
}
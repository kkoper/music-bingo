
import { SpotifyUser } from "./models/user";
const REDIRECT_URI = window.location.href;

function login() {    
    const url = getLoginURL([
        "user-read-email"
    ]);
    
    const width = 450,
        height = 730,
        left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.open(url,"Spotify","menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left);
}

function getLoginURL(scopes: string[]) {
    return "https://accounts.spotify.com/authorize?client_id=" + CLIENT_ID +
      "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
      "&scope=" + encodeURIComponent(scopes.join(" ")) +
      "&response_type=token";
}

async function spotifyInit(){
    const data = window.location.hash?.slice(1);    
    const accessToken = data?.split("&");
    const accessPoint = accessToken[0].split("=")[1];
    
    if(accessPoint){
        const userdata = await getUserData(accessPoint);
        document.getElementById("user-info")
        .innerHTML = `Authorized as ${userdata.display_name}`;
    }else{
        const loginButton = document.getElementById("btn-login");
        loginButton.style.display = "block";
        loginButton.addEventListener("click", login);
    }
}

async function getUserData(accessToken: string): Promise<SpotifyUser> {
    const response = await fetch("https://api.spotify.com/v1/me",{
        headers: {
           "Authorization": "Bearer " + accessToken
        }
    });

    return response.json();
}




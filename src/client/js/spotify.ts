let audioPlayer: HTMLAudioElement;

async function bingoInit(){
    
    const joinButton = document.getElementById("btn-join");
    joinButton.addEventListener("click", async function() {
        joinButton.style.display = "none";
        await fillBingoCard();
        setInterval(PollForTrack, 2000);
    });

    audioPlayer = document.getElementsByTagName("audio")[0] as HTMLAudioElement;
    audioPlayer.addEventListener("ended", function(){
        document
            .getElementById("equalizer")
            .style.display = "none";

        console.log("ended song");
   });
   
   //set inital volume to value of range slider
   volumeChanged();

   document.getElementById("volumeSlider")
    .addEventListener("input", volumeChanged);
}

function volumeChanged(){
    audioPlayer.volume = this.value;
}

async function PollForTrack(){
    if(audioPlayer.paused === false){
        console.log("There is currently a track playing, skipping poll");
        return;
    }

    try{
        console.log("polling for track");
        const response = await fetch("/api/session/currentTrack");
        if(response.status === 409){
            setErrorMessage("No current session, will automaticly join once it starts!");
            return;
        }else{
            setErrorMessage("");
        }
        const currentTrack = await response.json() as CurrentTrack;

        const localStorageKey = currentTrack.track.previewUrl;
        const localStorageValue = localStorage.getItem(localStorageKey);
        const plays = localStorageKey ? +localStorageValue : 0;

        if(+plays != currentTrack.plays) {
            playTrack(currentTrack);
            localStorage.setItem(currentTrack.track.previewUrl, currentTrack.plays.toString());
        }
    }catch(e){
        console.error("Error while polling", e);
    }
}

function setErrorMessage(message:string) {
    document.getElementById("error-message")
        .innerHTML = message;
}

async function playTrack(currentTrack: CurrentTrack){
    console.log(currentTrack);
    const audioplayer = document.getElementsByTagName("audio")[0] as HTMLAudioElement;
    audioplayer.muted = false;
    audioplayer.src = currentTrack.track.previewUrl;
    audioplayer.play();

    document
    .getElementById("equalizer")
    .style.display = "block";
}

interface CurrentTrack {
    plays: number,
    track: {
        previewUrl: string
    }
}



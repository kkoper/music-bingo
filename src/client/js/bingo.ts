
const localStorageKey = "bingoCard";

async function fillBingoCard(){
    const bingoCard = await getBingoCard(); 

    const container = document.getElementById("bingo-card-container");
    for (let i = 0; i < bingoCard.length; i++) {
        const box = bingoCard[i];
        const bingoBox = document.createElement("div");
        bingoBox.classList.add("bingo-box-baby");
        bingoBox.addEventListener("click", () => {
            bingoBox.classList.toggle("marked");
            saveBoxClicked(bingoBox.textContent, bingoBox.classList.contains("marked"));
        });
        bingoBox.appendChild(document.createTextNode(box.description));
        if(box.marked){
            bingoBox.classList.toggle("marked");
        }
        container.appendChild(bingoBox);   
    }

    container
        .style
        .display = "flex";

    document.getElementById("slidecontainer")
        .style
        .display = "block";    


    document.getElementById("reset-button")
    .style
    .display = "block";    
}

function reset() {
    const confirmReset = confirm("Resetting will give you a new bingo card and unmark all of your boxes, are you sure?");
    if(confirmReset){
        localStorage.clear();
        document.getElementById("bingo-card-container").innerHTML = "";
        fillBingoCard();
    }
}

function saveBoxClicked(description: string, marked: boolean){
    console.log(`saving ${description} - marked: ${marked}`);
    const valueFromStorage = localStorage.getItem("bingoCard");
    if(!valueFromStorage){
        console.error("no bingo card found when saving box state");
        return;
    }
    const bingoCard = JSON.parse(valueFromStorage) as bingoCard[];

    for (let i = 0; i < bingoCard.length; i++) {
        const element = bingoCard[i];
        if(element.description === description){
            element.marked = marked;
        }
    }

    localStorage.setItem(localStorageKey, JSON.stringify(bingoCard));
}

async function getBingoCard(): Promise<bingoCard[]>{
    const localStorageValue = localStorage.getItem("bingoCard");
    if(!localStorageValue){
        const response = await fetch("/api/playlist/bingocard")
            .then(r => r.json());
        const bingoCard = (response
                            .boxes as string[])
                            .map(b => {
                                return { 
                                    description: b,
                                    marked: false
                                };
                            });
                            
        localStorage.setItem(localStorageKey, JSON.stringify(bingoCard));
        return bingoCard;
    }else {
        return JSON.parse(localStorage.getItem("bingoCard")) as bingoCard[];
    }
}

interface bingoCard {
    description: string;
    marked: boolean;
}

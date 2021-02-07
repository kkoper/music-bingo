
async function fillBingoCard(){
    const bingoCard = await fetch("/api/playlist/bingocard")
        .then(r => r.json());   
    const boxes = bingoCard.boxes as string[];


    const container = document.getElementById("bingo-card-container");


    for (let i = 0; i < boxes.length; i++) {
        const boxstring = boxes[i];
        const bingoBox = document.createElement("div");
        bingoBox.classList.add("bingo-box-baby");
        bingoBox.addEventListener("click", () => {
            bingoBox.classList.toggle("marked");
        });
        bingoBox.appendChild(document.createTextNode(boxstring));
        container.appendChild(bingoBox);
        
    }

    container
        .style
        .display = "flex";
}

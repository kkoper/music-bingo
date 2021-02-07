
function fillBingoCard(){
    const numbers = [...Array(74).keys()];
    const bingoBoxes = document.getElementsByClassName("bingo-box-baby");

    for (const bingoBox of bingoBoxes) {
        if(bingoBox.id !== "middle-one"){
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const number = numbers.splice(randomIndex, 1);
        bingoBox.innerHTML = (+number + 1).toString();
        }
    }
}

function clickedBingoBox(element: Element) {
    element.classList.toggle("marked");
}

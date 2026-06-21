const levelSelect = document.getElementById("levelSelect");
const themeSelect = document.getElementById("themeSelect");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const pairsDisplay = document.getElementById("pairs");
const currentLevelDisplay = document.getElementById("currentLevel");
const messageBox = document.getElementById("messageBox");

const themes = {
    animals: ["🐶", "🐱", "🐵", "🦁", "🐸", "🐼", "🐯", "🦊"],
    sports: ["⚽", "🏀", "🏈", "🎾", "🏐", "🥊", "🏒", "🏆"],
    tech: ["💻", "📱", "⌨️", "🖱️", "🖥️", "🎧", "📷", "🤖"]
};

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;
let totalPairs = 4;

function getLevelInfo(level){
    if(level === "easy"){
        return { pairs: 4, label: "Débutant" };
    }

    if(level === "medium"){
        return { pairs: 6, label: "Intermédiaire" };
    }

    return { pairs: 8, label: "Avancé" };
}

function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}

function startGame(){
    const level = levelSelect.value;
    const theme = themeSelect.value;
    const levelInfo = getLevelInfo(level);

    totalPairs = levelInfo.pairs;
    currentLevelDisplay.textContent = levelInfo.label;

    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    lockBoard = false;

    movesDisplay.textContent = "0";
    pairsDisplay.textContent = "0";
    messageBox.classList.add("d-none");
    gameBoard.innerHTML = "";

    const selectedSymbols = themes[theme].slice(0, totalPairs);
    cards = shuffle([...selectedSymbols, ...selectedSymbols]);

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card-memory");
        card.dataset.symbol = symbol;
        card.textContent = "?";

        card.addEventListener("click", () => flipCard(card));

        gameBoard.appendChild(card);
    });
}

function flipCard(card){
    if(lockBoard) return;
    if(card.classList.contains("flipped")) return;
    if(card.classList.contains("matched")) return;

    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    if(flippedCards.length === 2){
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch(){
    const firstCard = flippedCards[0];
    const secondCard = flippedCards[1];

    if(firstCard.dataset.symbol === secondCard.dataset.symbol){
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;
        pairsDisplay.textContent = matchedPairs;

        flippedCards = [];

        if(matchedPairs === totalPairs){
            endGame();
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            firstCard.textContent = "?";
            secondCard.textContent = "?";

            flippedCards = [];
            lockBoard = false;
        }, 900);
    }
}

function endGame(){
    messageBox.innerHTML = `
        Bravo! Tu as terminé le niveau en ${moves} coups.
        Ta mémoire a été testée avec succès.
    `;

    messageBox.classList.remove("d-none");
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

startGame();

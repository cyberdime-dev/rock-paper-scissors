const buttons = document.querySelectorAll("button[data-choice]");
const resultText = document.getElementById("result-text");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const computerChoiceImage = document.getElementById("computer-choice-image");

// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Choices and their corresponding emojis
const choices = ["rock", "paper", "scissors"];
const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

// Function to get a random choice for the computer
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner
function determineWinner(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  }
  return "computer";
}

// Function to play the game
function playGame(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  // Show emoji
  computerChoiceImage.textContent = emojiMap[computerChoice];

  // Update result text and scores
  if (winner === "player") {
    playerScore++;
    resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
  } else if (winner === "computer") {
    computerScore++;
    resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
  } else {
    resultText.textContent = "It's a draw!";
  }

  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playGame(playerChoice);
  });
});

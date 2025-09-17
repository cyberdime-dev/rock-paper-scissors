/**
 * Rock Paper Scissors Game
 * A simple interactive game where the player competes against the computer
 */

// DOM element references
const buttons = document.querySelectorAll("button[data-choice]");
const resultText = document.getElementById("result-text");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const computerChoiceImage = document.getElementById("computer-choice-image");

/**
 * Game state management object
 * Handles all game state operations and UI updates
 */
const gameState = {
  playerScore: 0,
  computerScore: 0,
  
  /**
   * Increments player score and updates display
   */
  incrementPlayerScore() {
    this.playerScore++;
    this.updateScoreDisplay();
  },
  
  /**
   * Increments computer score and updates display
   */
  incrementComputerScore() {
    this.computerScore++;
    this.updateScoreDisplay();
  },
  
  /**
   * Resets all scores and clears display
   */
  reset() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.updateScoreDisplay();
    this.clearDisplay();
  },
  
  /**
   * Updates the score display in the DOM
   */
  updateScoreDisplay() {
    if (playerScoreEl) playerScoreEl.textContent = this.playerScore;
    if (computerScoreEl) computerScoreEl.textContent = this.computerScore;
  },
  
  /**
   * Clears the game result and computer choice display
   */
  clearDisplay() {
    if (resultText) resultText.textContent = "";
    if (computerChoiceImage) computerChoiceImage.textContent = "❓";
  }
};

// Choices and their corresponding emojis
const choices = ["rock", "paper", "scissors"];
const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

// Winner determination lookup table for better performance
const winConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

/**
 * Generates a random choice for the computer
 * @returns {string} A random choice from the available options
 */
function getComputerChoice() {
  try {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  } catch (error) {
    console.error("Error generating computer choice:", error);
    return "rock"; // Fallback to rock
  }
}

/**
 * Determines the winner of a round
 * @param {string} player - The player's choice
 * @param {string} computer - The computer's choice
 * @returns {string} "player", "computer", or "draw"
 */
function determineWinner(player, computer) {
  // Input validation
  if (!player || !computer) {
    console.error("Invalid input: player and computer choices are required");
    return "draw";
  }
  
  if (!choices.includes(player) || !choices.includes(computer)) {
    console.error("Invalid choice provided:", { player, computer });
    return "draw";
  }
  
  if (player === computer) return "draw";
  return winConditions[player] === computer ? "player" : "computer";
}

/**
 * Main game function that handles a complete round
 * @param {string} playerChoice - The player's chosen move
 */
function playGame(playerChoice) {
  try {
    // Validate player choice
    if (!playerChoice || !choices.includes(playerChoice)) {
      console.error("Invalid player choice:", playerChoice);
      return;
    }
    
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    // Show emoji
    if (computerChoiceImage && emojiMap[computerChoice]) {
      computerChoiceImage.textContent = emojiMap[computerChoice];
    }

    // Update result text and scores
    if (winner === "player") {
      gameState.incrementPlayerScore();
      if (resultText) {
        resultText.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
      }
    } else if (winner === "computer") {
      gameState.incrementComputerScore();
      if (resultText) {
        resultText.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
      }
    } else {
      if (resultText) {
        resultText.textContent = "It's a draw!";
      }
    }
    
  } catch (error) {
    console.error("Error during game play:", error);
    if (resultText) {
      resultText.textContent = "An error occurred. Please try again.";
    }
  }
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    playGame(playerChoice);
  });
});

/**
 * Keyboard event handler for game controls
 * Maps R, P, S keys to Rock, Paper, Scissors respectively
 */
document.addEventListener("keydown", (e) => {
  const keyMap = { 
    r: "rock", 
    p: "paper", 
    s: "scissors" 
  };
  const choice = keyMap[e.key.toLowerCase()];
  if (choice) {
    playGame(choice);
  }
});

/**
 * Resets the game to initial state
 * Clears scores and display elements
 */
function resetGame() {
  try {
    gameState.reset();
  } catch (error) {
    console.error("Error resetting game:", error);
  }
}

// Add reset button event listener
document.getElementById("reset-btn").addEventListener("click", resetGame);

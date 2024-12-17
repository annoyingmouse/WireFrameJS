/*
You are going to build an app that challenges players to identify a Christmas Movie from some emoji 🍿 🎅 🎬. The players will have 3 guesses per movie.

For example, the emoji 🌇 💣 👮 ✈️ ️🔫  represent the film “Die Hard”, which everyone knows is the best Christmas movie of all time.

In data.js you have an array of Christmas movies with emoji and text for aria labels.

Your task is to build an app that meets these criteria:

- The app should present the player with a set of emoji selected at random from the array in data.js.

- The player will input their guess.

- If the player guesses correctly, the app should display a message saying "Correct!". Then, after a pause of 3 seconds, it should randomly select the next set of emoji clues and display them to the player.

- If the player’s guess is incorrect, the app should display a message saying “Incorrect! You have 2 more guesses remaining.”

- If the player fails to guess correctly on the next two attempts, the app should display a message saying, `The film was <Film Name Here>!`. After a pause of 3 seconds, it should randomly select a new set of emoji clues and display them to the player.

- When all films in the array have been used, the player should see a message saying "That's all folks!".

- Each film should only be used once. There should be no repetition.


Stretch Goals

- Use AI to decide if an answer is correct or incorrect. For example if the correct answer is "The Polar Express" but the player inputs "Polar Express" a straight comparison of the two strings will find that the player's answer was incorrect. AI could assess if there is sufficient similarity between the strings to judge it as correct.

- Improve the UX by disabling the form/button when the game is over and during the pause between questions.
*/

const shuffle = (array) => {
  let currentIndex = array.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
};

import { films } from "./data.js";

const shuffledFilms = [...films];
shuffle(shuffledFilms);

let currentFilmIndex = 0;

// Some useful elements
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const messageContainer =
  document.getElementsByClassName("message-container")[0];
const emojiCluesContainer = document.getElementsByClassName(
  "emoji-clues-container",
)[0];

emojiCluesContainer.innerHTML = shuffledFilms[currentFilmIndex].emoji.join(" ");
let guessesLeft = 3;

guessInput.value = "";
guessInput.focus();

const checkGuess = (event) => {
  event.preventDefault();
  const guess = guessInput.value;
  if (guess === shuffledFilms[currentFilmIndex].title) {
    messageContainer.innerHTML = "Correct!";
    guessInput.value = "";
    guessInput.focus();
    guessButton.disabled = true;
    setTimeout(() => {
      currentFilmIndex++;
      if (currentFilmIndex < shuffledFilms.length) {
        guessesLeft = 3;
        const nextFilm = shuffledFilms[currentFilmIndex];
        emojiCluesContainer.innerHTML = nextFilm.emoji.join(" ");
        guessButton.disabled = false;
      } else {
        emojiCluesContainer.innerHTML = "That's all folks!";
      }
    }, 3000);
  } else {
    guessesLeft--;
    messageContainer.innerHTML = `Incorrect! You have ${guessesLeft} more guesses remaining.`;
    if (guessesLeft === 0) {
      messageContainer.innerHTML = `The film was ${shuffledFilms[currentFilmIndex].title}!`;
      guessInput.value = "";
      guessInput.focus();
      guessButton.disabled = true;
      setTimeout(() => {
        currentFilmIndex++;
        if (currentFilmIndex < shuffledFilms.length) {
          const nextFilm = shuffledFilms[currentFilmIndex];
          emojiCluesContainer.innerHTML = nextFilm.emoji.join(" ");
          guessButton.disabled = false;
        } else {
          emojiCluesContainer.innerHTML = "That's all folks!";
        }
      }, 3000);
    }
  }
};

guessForm.addEventListener("submit", checkGuess);

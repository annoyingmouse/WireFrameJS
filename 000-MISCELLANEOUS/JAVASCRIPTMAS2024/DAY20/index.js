import { HfInference } from "https://cdn.jsdelivr.net/npm/@huggingface/inference@2.8.1/+esm";
import { getToken } from "./env.js";
const TOKEN = getToken();
const hf = new HfInference(TOKEN);

const textToGenerate = `Give me a elf name (forename and surname) based on the initials of the user's first and last name. For example, if the user's name is "John Doe", the elf name could be "Joyful Dazzle. The users name is Dominic Myers. Limit your response to the Forename and Surname. `;

const response = await hf.textGeneration({
  inputs: textToGenerate,
  model: "HuggingFaceH4/zephyr-7b-beta",
});

console.log(response);

const elfFirstNames = [
  "Aurora",
  "Blitzen",
  "Crispin",
  "Dazzle",
  "Evergreen",
  "Frost",
  "Glimmer",
  "Holly",
  "Icicle",
  "Joyful",
  "Kringle",
  "Luna",
  "Merry",
  "Nutmeg",
  "Olwen",
  "Pine",
  "Quill",
  "Razzle",
  "Sparkle",
  "Tinsel",
  "Umbra",
  "Vixen",
  "Whisk",
  "Xylo",
  "Yule",
  "Zippy",
];

const usedElfFirstNames = [];

const elfLastNames = [
  "Applecheeks",
  "Bells",
  "Candycane",
  "Dazzlebright",
  "Everbright",
  "Frostwhisk",
  "Gingersnap",
  "Hollyberry",
  "Icestorm",
  "Jovial",
  "Kindleflame",
  "Lightwhisper",
  "Merrysprout",
  "Nutcracker",
  "Oakenleaf",
  "Peppermint",
  "Quicksilver",
  "Raindrop",
  "Snowdust",
  "Twinkletoes",
  "Underwood",
  "Velvet",
  "Winterberry",
  "Xylospark",
  "Yuletide",
  "Zestwind",
];

const usedElfLastNames = [];

/*
 * 🎅 Task:
 * - Generate an elf first and last name that matches the user’s first and last name initials, then display it on the screen.
 * - Example: if the user’s name is "John Doe," the elf name could be "Joyful Dazzle."
 * - Display the generated elf names in the "Registered Employees" list.
 */

/*
 * 🌟 Stretch Goals:
 * - Generate the elf names using an LLM API (like HuggingFace).
 * - Don't save the same name twice. (not necessary for the normal task)
 * - Make sure to use Scrimba's environment variables feature so you don't expose your API key
 */

(() => {
  const generate = document.getElementById("generate-btn");
  const registeredEmployees = document.getElementById("elf-names-list");
  const firstName = document.querySelector('input[name="first-name"]');
  const lastName = document.querySelector('input[name="last-name"]');
  const sheet = new CSSStyleSheet();
  sheet.replace(`.error {
    box-shadow: inset 0 0 0 2px #f00;
  }`);
  document.adoptedStyleSheets = [sheet];
  firstName.addEventListener("input", () => {
    if (firstName.value.length > 0) {
      firstName.classList.remove("error");
    }
  });
  lastName.addEventListener("input", () => {
    if (lastName.value.length > 0) {
      lastName.classList.remove("error");
    }
  });
  generate.addEventListener("click", () => {
    if (firstName.value.length === 0) {
      firstName.classList.add("error");
      return;
    }
    if (lastName.value.length === 0) {
      lastName.classList.add("error");
      return;
    }
    const firstInitial = firstName.value[0].toUpperCase();
    const lastInitial = lastName.value[0].toUpperCase();
    const elfFirstName = elfFirstNames[firstInitial.charCodeAt() - 65];
    const elfLastName = elfLastNames[lastInitial.charCodeAt() - 65];
    usedElfFirstNames.push(elfFirstName);
    usedElfLastNames.push(elfLastName);
    elfFirstNames.splice(firstInitial.charCodeAt() - 65, 1);
    elfLastNames.splice(lastInitial.charCodeAt() - 65, 1);
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `${elfFirstName} ${elfLastName}`;
    registeredEmployees.appendChild(li);
    firstName.value = "";
    lastName.value = "";
    const lis = registeredEmployees.querySelectorAll("li");
    if (lis.length > 0) {
      lis.forEach((li) => {
        if (!li.classList.contains("list-group-item")) {
          li.remove();
        }
      });
    }
  });
})();

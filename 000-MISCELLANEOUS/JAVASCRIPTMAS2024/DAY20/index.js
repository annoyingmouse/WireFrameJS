import { HfInference } from "https://cdn.jsdelivr.net/npm/@huggingface/inference@2.8.1/+esm";
import { getToken } from "./env.js";
const TOKEN = getToken();

const useAI = true; // if true, it uses the AI function to generate elf name, else a name is generated based on the arrays at the top

async function generateElfNameAi(firstInitial, lastInitial) {
  const hf = new HfInference(TOKEN);
  const generationPrompt = `
        You are an elf name generator that loves all words related to Christmas and the holidays.
        Ensure the name is properly elf-like. Use names that might be found in a fantasy world. 
        Always return the result in this JSON format:
        {
          "type": "string",
          "value": "Firstname Lastname"
        }

        Generate an elf name on the format Firstname Lastname for initials ${firstInitial} and ${lastInitial}:`;
  const temp = (Math.random() + 3) / 4; // this helps creating variety in the outputs so the same initials won't generate the exact same output every time.
  const response = await hf.textGeneration({
    inputs: generationPrompt,
    model: "google/gemma-2-2b-it",
    parameters: {
      grammar: {
        type: "json",
        value: JSON.stringify({
          type: "object",
          properties: {
            type: { type: "string", enum: ["string"] },
            value: { type: "string" },
          },
          required: ["type", "value"],
        }),
      },
      max_new_tokens: 50,
      temperature: temp,
    },
  });
  const jsonMatch = response.generated_text.match(
    /\{(?:[^{}]|(?:\{[^{}]*\}))*\}$/,
  ); // regex matches an object that ends the string (which is what we're interested in as the output is like this "generationPrompt: Generation from LLM, which we have configured to be a json object")
  if (jsonMatch) {
    console.log(jsonMatch);
    try {
      const resultObject = JSON.parse(jsonMatch[0]); // have to access first index as match returns an array.
      console.log("Extracted JSON Object:", resultObject);
      return resultObject.value;
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
    }
  }
}

// console.log(response);

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
    if (useAI) {
      const elfName = generateElfNameAi(firstInitial, lastInitial);
      if (elfName) {
        console.log();
      }
    }

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

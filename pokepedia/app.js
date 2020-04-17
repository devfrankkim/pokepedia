// DOM Objects
//1. JavaScript DOM manipuplation to first grab the HTML tags
//2. Units must have more than 1 type and some units have 2 types maximum.
const mainScreen = document.querySelector(".main-screen"); // to remove "".hide"
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeheight = document.querySelector(".poke-height");

// TYPES(CSS)
const TYPES = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "dark",
  "fairy"
];

// Functions

// First letter(Uppercase)
const capitalize = str => str[0].toUpperCase() + str.substr(1);

// Resetting (TYPES, classList)
const resetScreen = () => {
  // display
  mainScreen.classList.remove("hide");
  // background-color(css)
  TYPES.map(type => mainScreen.classList.remove(type));
};

// fetching url for left screen.
const url = "https://pokeapi.co/api/v2/pokemon/1";
fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    resetScreen();
    // Types (some have 1 or 2 types and types are mixed) ex) id: 101, 121
    const dataTypes = data["types"];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];

    pokeTypeOne.textContent = capitalize(dataFirstType["type"]["name"]);

    if (dataSecondType) {
      mainScreen.classList.add(dataSecondType["type"]["name"]);
      pokeTypeTwo.textContent = capitalize(dataSecondType["type"]["name"]);
    } else {
      mainScreen.classList.add(dataFirstType["type"]["name"]);
      pokeTypeTwo.classList.add("hide");
      pokeTypeTwo.textContent = "";
    }

    // DOM manipulation
    pokeName.textContent = capitalize(data["name"]);
    // left padding with 0 less than 3 digits
    pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
    pokeWeight.textContent = data["weight"];
    pokeheight.textContent = data["height"];

    pokeFrontImage.src = data["sprites"]["front_default"] || "";
    pokeBackImage.src = data["sprites"]["back_default"] || "";
  });

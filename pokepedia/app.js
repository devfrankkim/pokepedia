// DOM Objects
//1. JavaScript DOM manipuplation to first grab the HTML tags
//2. Units must have more than 1 type and some units have 2 types maximum.
const mainScreen = document.querySelector(".main-screen");
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeheight = document.querySelector(".poke-height");

console.log(pokeName);

const url = "https://pokeapi.co/api/v2/pokemon/1";
fetch(url)
  .then(res => res.json())
  .then(data => {
    // console.log(data.name);
    // Once getting the data, I want to get the main-screen and remove the hide class
    // Accessing classList and removing the class.
    mainScreen.classList.remove("hide");
    pokeName.textContent = data["name"];
    pokeId.textContent = data["id"];
    pokeWeight.textContent = data["weight"];
    pokeheight.textContent = data["height"];
    console.log(pokeheight, pokeWeight);

    const {
      type: { name }
    } = data["types"][0];
    console.log(name);
  });

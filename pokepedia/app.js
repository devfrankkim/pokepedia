// DOM Objects
//JavaScript DOM manipuplation to first grab the HTML tags
const mainScreen = document.querySelector(".main-screen"); // to remove "".hide"
const pokeName = document.querySelector(".poke-name");
const pokeId = document.querySelector(".poke-id");
const pokeFrontImage = document.querySelector(".poke-front-image");
const pokeBackImage = document.querySelector(".poke-back-image");
const pokeTypeOne = document.querySelector(".poke-type-one");
const pokeTypeTwo = document.querySelector(".poke-type-two");
const pokeWeight = document.querySelector(".poke-weight");
const pokeheight = document.querySelector(".poke-height");
const pokeListItems = document.querySelectorAll(".list-item");
const leftButton = document.querySelector(".left-button");
const rightButton = document.querySelector(".right-button");
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
let prevUrl = null;
let nextUrl = null;

// Functions

// First letter(Uppercase)
const capitalize = str => str[0].toUpperCase() + str.substr(1);

// Resetting (TYPES, classList)
const resetScreen = () => {
  // display: none
  mainScreen.classList.remove("hide");
  // background-color(css)
  TYPES.map(type => mainScreen.classList.remove(type));
};

// get data for right side of screen
const fetchPokeList = url => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const { results, previous, next } = data;
      prevUrl = previous;
      nextUrl = next;

      // **getting Index**
      for (let i = 0; i < pokeListItems.length; i++) {
        const pokeListItem = pokeListItems[i]; //  node
        const resultData = results[i]; // data(url, name)

        // data result
        if (resultData) {
          const { name, url } = resultData;
          const urlArray = url.split("/");
          const id = urlArray[urlArray.length - 2];
          pokeListItem.innerHTML = `${id}. ${capitalize(name)}`;
        } else {
          pokeListItem.textContent = "";
        }
      }
    });
};
const fetchPokeData = id => {
  const urlLeftScreen = `https://pokeapi.co/api/v2/pokemon/${id}`;
  fetch(urlLeftScreen)
    .then(res => res.json())
    .then(data => {
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

      // DOM manipulation(capital letter)
      pokeName.textContent = capitalize(data["name"]);
      // left padding with 0 less than 3 digits for #numbers
      pokeId.textContent = "#" + data["id"].toString().padStart(3, "0");
      pokeWeight.textContent = data["weight"];
      pokeheight.textContent = data["height"];

      pokeFrontImage.src = data["sprites"]["front_default"] || "";
      pokeBackImage.src = data["sprites"]["back_default"] || "";
    });
};
const handleRightButtonClick = () => {
  if (nextUrl) {
    fetchPokeList(nextUrl);
  }
};

const handleLeftButtonClick = () => {
  if (prevUrl) {
    fetchPokeList(prevUrl);
  }
};

const handleListItemClick = e => {
  if (!e.target || !e.target.textContent) return;
  const id = e.target.textContent.split(".")[0];
  fetchPokeData(id);
};

leftButton.addEventListener("click", handleLeftButtonClick);
rightButton.addEventListener("click", handleRightButtonClick);

// go through all the lists and add eventListeners to all of them.
for (const pokeListItem of pokeListItems) {
  pokeListItem.addEventListener("click", handleListItemClick);
}
// initialize App
fetchPokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");

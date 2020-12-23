// Get form button
const button = document.getElementById('btn');
const JSONFILE = 'dino.json';

// Fetch dino data from json file
const dinos = (function (){
  let dinoArray = [''];
  // Disable form button to prevent a comparison before the entire list of
  // dinos has been fetched.
  button.disabled = true;

  fetch(JSONFILE)
    .then(response => response.json())
    .then(data => dinoArray = data.Dinos)
    .then(enable => button.disabled = false)
    .catch(err => console.log(`Unable to read dino.json file: ${err}`));
  return {
    getList: function (){
      return dinoArray;
    }
  };
})();

// Use IIFE to get human data from form
const humanData = (function (){
  let name = document.getElementById('name');
  let feet = document.getElementById('feet');
  let inches = document.getElementById('inches');
  let weight = document.getElementById('weight');
  let diet = document.getElementById('diet');

  return {
    getData: function (){
      return {
        name: name.value,
        height: (parseInt(feet.value) * 12) + parseInt(inches.value),
        weight: parseInt(weight.value),
        diet: diet.value
      };
    }
  };
})();

/**
* @description Creates an Animal object using functional mixins
* @constructor
* @param {object} object - The object containing the Animal attributes
* @returns {object} A new Animal object
*/
function Animal(object){
  return Object.assign({}, object);
}

/**
* @description Creates a list of Dino Objects
* @param {array} dinos - The list of all the dinos included in the json file
* @returns {array} The list of new Dino Objects
*/
function createDinoObjects(dinos){
  const dinoObjects = [];

  dinos.getList().forEach(ele => dinoObjects.push(Animal(ele)));
  return dinoObjects;
}

/**
* @description Creates one Human Object
* @constructor
* @param {object} data - The object containing the human data from the form
* @returns {object} A new Human Object
*/
function createHumanObject(data){
  return Animal(data);
}

/**
* @description Compares the weight of a Dino and a Human
* NOTE: Weight in JSON file is in lbs.
* @param {object} dino - The Dino Object we want to compare
* @param {object} human - The Human Object we want to compare
* @returns {string} The fact to be displayed in the tile. Here is where
* we explain the result of the comparison.
*/
function compareWeight(dino, human){
  const timesHeavier = dino.weight / human.weight;
  return `The ${dino.species} is ${parseInt(timesHeavier)} times heavier than you!`;
}

/**
* @description Compares the height of a Dino and a Human
* NOTE: Height in JSON file is in inches.
* @param {object} dino - The Dino Object we want to compare
* @param {object} human - The Human Object we want to compare
* @returns {string} The fact to be displayed in the tile. Here is where
* we explain the result of the comparison.
*/
function compareHeight(dino, human){
  const timesTaller = dino.height / human.height;
  return `The ${dino.species} is ${parseInt(timesTaller)} times taller than you!`;
}

/**
* @description Compares the diet of a Dino and a Human
* @param {object} dino - The Dino Object we want to compare
* @param {object} human - The Human Object we want to compare
* @returns {string} The fact to be displayed in the tile. Here is where
* we explain the result of the comparison.
*/
function compareDiet(dino, human){
  if(dino.diet.toLowerCase() == human.diet.toLowerCase()){
    return `Both the ${dino.species} and you are ${human.diet.toLowerCase()}!`;
  } else {
    return `The ${dino.species} is ${dino.diet} but you are ${human.diet.toLowerCase()}`;
  }
}

/**
* @description Creates a single div element with a title, an image and a fact
* @param {object} dino - The Dino Object we want to display
* @param {string} fact - The fact we want to include in the div element
* @returns {object} The div element to be displayed in the grid
*/
function createTile(dino, fact){
  let newTile = document.createElement('div');
  newTile.className = 'grid-item';
  let title = document.createElement('h3');
  let img = document.createElement('img');

  if(dino.hasOwnProperty('species')){
    title.innerHTML = dino.species;
    img.src = 'images/' + dino.species.toLowerCase() + '.png';
    img.alt = 'An image of a ' + dino.species;
  } else {
    // It is a human
    title.innerHTML = dino.name;
    img.src = 'images/human.png';
    img.alt = 'An image of a human';
  }

  let para = document.createElement('p');
  let text = document.createTextNode(fact);
  para.appendChild(text);

  newTile.append(title);
  newTile.append(img);
  // Only display the fact if the tile is a dino
  if(dino.hasOwnProperty('species')){
    newTile.append(para);
  }

  return newTile;
}

/**
* @description Randomly generates one tile per Dino in the array. Only 3 dinos
* will be compared with the human object. Each compare method is used only once.
* @param {array} dinos - The list of Dino Objects we want to display
* @param {object} human - The Human Object we want to compare
* @returns {array} The list of tiles to be displayed in the grid after they
* have been compared.
*/
function createTiles(dinos, human){
  let tilesArray = [];
  let indexesUsed = [];
  let randomIndex;
  let randomDino;
  // The i index will make sure we visit all the dinos in the array only once
  let i = 0;
  // The j index will make sure we use the 3 methods only once each
  let j = 0;

  do {
    randomIndex = Math.floor(Math.random() * dinos.length);

    // Check if the randomIndex has already been visited
    if(!indexesUsed.includes(randomIndex)){
      i = i + 1;
      indexesUsed.push(randomIndex);
      randomDino = dinos[randomIndex];

      if(randomDino.species.toLowerCase() == 'pigeon'){
        tilesArray.push(createTile(randomDino, randomDino.fact));
      } else if(j == 0) {
        j = j + 1;
        tilesArray.push(createTile(randomDino, compareWeight(randomDino, human)));
      } else if(j == 1) {
        j = j + 1;
        tilesArray.push(createTile(randomDino, compareHeight(randomDino, human)));
      } else if(j == 2) {
        j = j + 1;
        tilesArray.push(createTile(randomDino, compareDiet(randomDino, human)));
      } else {
        tilesArray.push(createTile(randomDino, randomDino.fact));
      }
    }
} while(i < dinos.length);

  return tilesArray;
}

/**
* @description Appends all dino tiles to the grid and generates a human tile
* that is also appended to the middle of the grid.
* @param {array} tiles - The list of Dino tiles we want to append
* @param {object} human - The Human Object we want to append
*/
function addTilesToDOM(tiles, human){
  let grid = document.getElementById('grid');
  const humanTile = createTile(human, '');
  grid.appendChild(tiles[0]);
  grid.appendChild(tiles[1]);
  grid.appendChild(tiles[2]);
  grid.appendChild(tiles[3]);
  grid.appendChild(humanTile);
  grid.appendChild(tiles[4]);
  grid.appendChild(tiles[5]);
  grid.appendChild(tiles[6]);
  grid.appendChild(tiles[7]);
}

// Remove form from screen
function hideForm(){
  let form = document.getElementById('dino-compare');
  form.style.display = 'none';
}

// On button click, generate dino and human objects, create tiles for each
// object and add them to the grid (display infographic).
// Finally, remove form from screen.
button.addEventListener('click', () => {
  const dinoObjects = createDinoObjects(dinos);
  const human = createHumanObject(humanData.getData());
  const tiles = createTiles(dinoObjects, human);
  addTilesToDOM(tiles, human);
  hideForm();
});

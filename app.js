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

/**
* @description Creates an Animal object
* @constructor
* @param {object} object - The object containing the Animal attributes
*/
function Animal(object){
  this.name = object.name || '';
  this.species = object.species;
  this.weight = object.weight;
  this.height = object.height;
  this.diet = object.diet;
}

/**
* @description Creates a Dino object
* @constructor
* @param {object} object - The object containing the Dinosaur attributes
*/
function Dino(object){
  Animal.call(this, object)
  this.where = object.where;
  this.when = object.when;
  this.fact = object.fact;
}

Dino.prototype = Object.create(Animal.prototype);
Dino.prototype.constructor = Dino;

/**
* @description Creates a Human Object from user's input data
* @constructor
*/
function Human(){
  // We use an IIFE to get human data from form
  Animal.call(this, (function (){
    const name = document.getElementById('name');
    const feet = document.getElementById('feet');
    const inches = document.getElementById('inches');
    const weight = document.getElementById('weight');
    const diet = document.getElementById('diet');

    return {
      species: 'human',
      name: name.value,
      height: parseInt(feet.value) * 12 + parseInt(inches.value),
      weight: parseInt(weight.value),
      diet: diet.value
    };
  })());
}

Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human;

/**
* @description Creates a list of Dino Objects
* @param {array} dinos - The list of all the dinos included in the json file
* @returns {array} The list of new Dino Objects
*/
function createDinoObjects(dinos){
  const dinoObjects = [];

  dinos.getList().forEach(ele => dinoObjects.push(new Dino(ele)));
  return dinoObjects;
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
  const newTile = document.createElement('div');
  newTile.className = 'grid-item';
  const title = document.createElement('h3');
  const img = document.createElement('img');

  if(dino.species != 'human'){
    title.innerHTML = dino.species;
    img.src = 'images/' + dino.species.toLowerCase() + '.png';
    img.alt = 'An image of a ' + dino.species;
  } else {
    // It is a human
    title.innerHTML = dino.name;
    img.src = 'images/human.png';
    img.alt = 'An image of a human';
  }

  const para = document.createElement('p');
  const text = document.createTextNode(fact);
  para.appendChild(text);

  newTile.append(title);
  newTile.append(img);
  // Only display the fact if the tile is a dino
  if(dino.species != 'human'){
    newTile.append(para);
  }

  return newTile;
}

/**
* @description Randomly visits all the dinos. It compares the human object with
* 3 dinos only, using one method each time and finally creates one tile per dino
* @param {array} dinos - The list of Dino Objects we want to display
* @param {object} human - The Human Object we want to compare
* @returns {array} The list of tiles to be displayed in the grid
*/
function createTiles(dinos, human){
  const methods = [compareWeight, compareHeight, compareDiet];
  const indexesUsed = [];
  let randomIndex, randomDino;
  // The i index will make sure we visit all the dinos in the array only once
  let i = 0;
  const visitedDinos = []; // These dinos will be transformed into tiles

  do {
    randomIndex = Math.floor(Math.random() * dinos.length);

    // Check if the randomIndex has already been visited
    if(!indexesUsed.includes(randomIndex)){
      i = i + 1;
      indexesUsed.push(randomIndex);
      randomDino = dinos[randomIndex];

      if(methods.length != 0 && randomDino.species.toLowerCase() != 'pigeon'){
        // Compare using one method
        randomDino.fact = methods.pop()(randomDino, human);
      }
      visitedDinos.push(randomDino);
    }
  } while(i < dinos.length);

  return visitedDinos.map(dino => {
    return createTile(dino, dino.fact);
  });
}

/**
* @description Appends all dino tiles to the grid and generates a human tile
* that is also appended to the middle of the grid.
* @param {array} tiles - The list of Dino tiles we want to append
* @param {object} human - The Human Object we want to append
*/
function addTilesToDOM(tiles, human){
  const grid = document.getElementById('grid');
  const humanTile = createTile(human, '');

  // Add human tile to the middle of the tiles array
  tiles.splice(parseInt(tiles.length/2), 0, humanTile);
  tiles.forEach(tile => grid.appendChild(tile));
}

// Remove form from screen
function hideForm(){
  const form = document.getElementById('dino-compare');
  form.style.display = 'none';
}

// On button click, generate dino and human objects, create tiles for each
// object and add them to the grid (display infographic).
// Finally, remove form from screen.
button.addEventListener('click', () => {
  const dinoObjects = createDinoObjects(dinos);
  const human = new Human();
  const tiles = createTiles(dinoObjects, human);
  addTilesToDOM(tiles, human);
  hideForm();
});

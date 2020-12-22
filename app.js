// Get form button
const button = document.getElementById('btn');

// Fetch dino data from json file
const dinos = (function (){
  let dinoArray = [''];
  // Disable form button to prevent a comparison before the list of dinos
  // has been populated.
  button.disabled = true;

  fetch('dino.json')
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

// Create Dino Constructor using functional mixins
function Animal(object){
  return Object.assign({}, object);
}

// Create Dino Objects
// @param array of all the dinos included in the json file
function createDinoObjects(dinos){
  const dinoObjects = [];

  dinos.getList().forEach(ele => dinoObjects.push(Animal(ele)));
  return dinoObjects;
}

// Create Human Object
// @param Object with the human data gathered from the form
function createHumanObject(data){
  return Animal(data);
}


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareWeight(dino, human){
  const timesHeavier = dino.weight / human.weight;
  return `The ${dino.species} is ${parseInt(timesHeavier)} times heavier that you!`;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareHeight(dino, human){
  const timesTaller = dino.height / human.height;
  return `The ${dino.species} is ${parseInt(timesTaller)} times taller that you!`;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(dino, human){
  if(dino.diet.toLowerCase() == human.diet.toLowerCase()){
    return `The ${dino.species} and you are both ${human.diet}!`;
  } else {
    return `The ${dino.species} is ${dino.diet} but you are ${human.diet}`;
  }
}

function createTile(name, fact){
  let newTile = document.createElement('div');
  let title = document.createElement('h4');
  title.innerHTML = name;
  let img = document.createElement('img');
  img.src = 'images/' + name.toLowerCase() + '.png';
  img.alt = 'An image of a ' + name;
  let desc = document.createElement('span');
  desc.innerHTML = fact;

  newTile.append(title);
  newTile.append(img);
  newTile.append(fact);

  return newTile;
}

// Generate Tiles for each Dino in Array
function createTiles(dinos, human){
  let tilesArray = [];
  let indexesUsed = [];
  let randomIndex;
  let randomDino;
  let i = 0;
  let j = 0;

  do {
    randomIndex = Math.floor(Math.random() * dinos.length);

    // Check if the randomIndex has already been visited
    if(!indexesUsed.includes(randomIndex)){
      i = i + 1;
      indexesUsed.push(randomIndex);
      randomDino = dinos[randomIndex];

      if(randomDino.species.toLowerCase() == 'pigeon'){
        tilesArray.push(createTile(randomDino.species, randomDino.fact));
        console.log(createTile(randomDino.species, randomDino.fact));
      } else if(j == 0) {
        j = j + 1;
        tilesArray.push(createTile(randomDino.species, compareWeight(randomDino, human)));
        console.log(createTile(randomDino.species, compareWeight(randomDino, human)));
      } else if(j == 1) {
        j = j + 1;
        tilesArray.push(createTile(randomDino.species, compareHeight(randomDino, human)));
        console.log(createTile(randomDino.species, compareHeight(randomDino, human)));
      } else if(j == 2) {
        j = j + 1;
        tilesArray.push(createTile(randomDino.species, compareDiet(randomDino, human)));
        console.log(createTile(randomDino.species, compareDiet(randomDino, human)));
      } else {
        tilesArray.push(createTile(randomDino.species, randomDino.fact));
        console.log(createTile(randomDino.species, randomDino.fact));
      }
    }
  } while(i < 8);

  return tilesArray;
}
    // Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
button.addEventListener('click', () => {
  const dinoObjects = createDinoObjects(dinos);
  const human = createHumanObject(humanData.getData());
  console.log(dinoObjects);
  console.log(human);
  const tiles = createTiles(dinoObjects, human);
  console.log(tiles);
});

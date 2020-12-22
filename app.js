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


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array
function createTiles(dinos, human){
  let tilesArray = [];
  // Store the indexes of the dinos that have already been visited
  let indexesUsed = [];
  let randomIndex;
  let randomDino;
  let i = 0;

  do {
    randomIndex = Math.floor(Math.random() * dinos.length);

    // Check if the randomIndex has already been visited
    if(!indexesUsed.includes(randomIndex)){
      i = i + 1;
      indexesUsed.push(randomIndex);
      randomDino = dinos[randomIndex];
      console.log(`The random dino is ${randomDino.fact} with index: ${randomIndex}`);
      console.log(`The array of indexes is: ${indexesUsed}`);
      // TODO: compare 3 randomDino with human
      // TODO: create tile for randomDino
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
});

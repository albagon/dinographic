// Get form button
const button = document.getElementById('btn');
// Fetch dino data from json file
const dinos = (function (){
  let dinoArray = ['nada'];
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

// Use IIFE to get human data from form
const humanData = (function (){
  let name = document.getElementById('name');
  let feet = document.getElementById('feet');
  let inches = document.getElementById('inches');
  let weight = document.getElementById('weight');
  let diet = document.getElementById('diet');

  return {
    getHumanData: function (){
      console.log(`This is the human name: ${name.value}`);
      console.log(`This is the human feet: ${feet.value}`);
      console.log(`This is the human inches: ${inches.value}`);
      console.log(`This is the human weight: ${weight.value}`);
      console.log(`This is the human diet: ${diet.value}`);
    }
  };
})();


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

    // Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
button.addEventListener('click', () => {
  humanData.getHumanData();
  const dinoObjects = createDinoObjects(dinos);
  console.log(dinoObjects);
});

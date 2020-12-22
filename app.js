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

// Create Dino Constructor
const animal = {
  'species': 'Triceratops',
  'weight': 0,
  'height': 0,
  'diet': '',
  'fact': ''
};

// Create Dino Objects
const dinoObjects = [];
const dino1 = Object.create(animal);
dinoObjects.push(dino1);
console.log(`DinoObjects: ${dinoObjects[0].species}`);
console.log(`Dinos list: ${dinos.getList()}`);

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
button.addEventListener('click', humanData.getHumanData);

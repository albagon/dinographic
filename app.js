
// Create Dino Constructor


// Create Dino Objects


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
const button = document.getElementById('btn');
button.addEventListener('click', humanData.getHumanData);

#!/usr/bin/env node
const fetch = require('node-fetch')
const fs = require('fs');

//readFile
var filename = './bin/input.txt'
var pokemonStr = fs.readFileSync(filename, 'utf8', function(err, data){
    if (err) {
        return console.error(err);
     }
     return data.toString();
});
//console.log(pokemonStr)

//split the input string based on new line to an array
//run get type for each entry
pokemonStr.split('\n').map((poke) => getType(poke))

//get the type for a given name
//format to string with name and print to console
async function getType(name= 'ditto'){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json()) 
    .then((data) => data.types)
    .then((types) => {
      pokeUpper = capitalizeFirstLetter(name);
      if(types.length === 1){
        console.log(`${pokeUpper}: ${types[0].type.name}`);
      } else {
        console.log(`${pokeUpper}: ${types[0].type.name}, ${types[1].type.name}`);
      }
    })
    .catch((err) => console.error(err.message))
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

'use strict';

const HashMap = require('./hash-maps');

HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

function main() {

  let lor = new HashMap();

  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');

  // console.log(lor.get('Hobbit'));
  // console.log(lor.get('Maiar'));

  // console.log(lor);

}

main();

// 1. there was a collision of the same key for both hobbit and maiar when adding the new values in... 
// it is just using open addressing so the conflict of keys just overwrote the value paired with most recent addition.
// The capacity of lor hash table is 24, because it started at 8 and the set() method
// resized the hash table by the HashMap.SIZE_RATIO, which is set at 3. this resulted in the final capacity of 24.

// 2. WhatDoesThisDo

const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
};

// this prints out 20 and 10, respectively. This is due to the open addressing of the hash map -- the keys are colliding
// and the values being overwritten with the most recent addition.

// 3. Demonstrate understanding of Hash maps

// 1) capacity will be 33

let mapAnswer1 = [
  // <3 empty items>,
  {key: '4', value: 4, DELETED: false },
  // <5 empty items>,
  {key: '10', value: 10, DELETED: false },
  // <4 empty items>,
  {key: '15', value: 15, DELETED: false },
  // <1 empty items>,
  {key: '17', value: 17, DELETED: false },
  // <4 empty items>,
  {key: '22', value: 22, DELETED: false },
  // <5 empty items>,
  {key: '28', value: 28, DELETED: false },
  // <2 empty items>,
  {key: '31', value: 31, DELETED: false },
  // <17 empty items>,
  {key: '59', value: 59, DELETED: false },
  // <28 empty items>,
  {key: '88', value: 88, DELETED: false },
];

// 2) capacity would be 27

let mapAnswer2 = [
  // <4 empty items>,
  {key: '5', value: 5, DELETED: false },
  // <4 empty items>,
  {key: '10', value: 10, DELETED: false },
  // <1 empty items>,
  {key: '12', value: 12, DELETED: false },
  // <2 empty items>,
  {key: '15', value: 15, DELETED: false },
  // <1 empty items>,
  {key: '17', value: 17, DELETED: false },
  {key: '19', value: 19, DELETED: false },
  {key: '20', value: 20, DELETED: false },
  // <7 empty items>,
  {key: '28', value: 28, DELETED: false },
  // <3 empty items>,
  {key: '33', value: 33, DELETED: false },
];

// 4. Remove duplicates

function removeDupes(str) {
  let resultMap = new HashMap;
  let arr = str.split('');
  let result = [];
  
  for (let i = 0; i < arr.length; i++) {
    resultMap.set(arr[i], arr[i]);
  }
  console.log(resultMap);
  for (let k = 0; k < resultMap.length; k++) {
    if (resultMap[k].key !== null) {
      console.log('triggered!');
      result.push(resultMap[k].key);
    }
  }
  return result;
}

console.log(removeDupes('google'));

// for 4-5-6, can use the Map constructor
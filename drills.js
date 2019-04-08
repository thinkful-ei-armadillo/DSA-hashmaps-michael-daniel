'use strict';

const HashMap = require('./hash-maps');
const LinkedList = require('./linked-list');

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
  let resultMap = new HashMap();
  let arr = str.split('');
  let result = new HashMap();
  let final = new Map();

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== ' ') {
      resultMap.set(arr[i], i);
    }
  }
  console.log(resultMap);
  for (let k = 0; k < resultMap.length; k++) {
    // if (resultMap.get!== null) {
    //   console.log('triggered!');
    //   result.push(resultMap.get[k]);
    // }
    result.set(resultMap.get(k), k);
  }
  return result;
}

// console.log(removeDupes('google'));

// for 4-5-6, can use the Map constructor


// 5. palindromes

function palindrome(str) {
  str = str.toLowerCase();
  const letterMap = new HashMap();

  for (let i = 0; i < str.length; i++) {
    // setting letterMap up based on if key exists or not -- if not, initialize it with a count of 1
    try {
      let count = letterMap.get(str[i]);
      letterMap.set(str[i], ++count);
    } catch (err) {
      letterMap.set(str[i], 1);
    }
  }
  // if str length is even, evaluate lettermap here
  if (str.length % 2 === 0) {
    for (let j = 0; j < str.length; j++) {
      const num = letterMap.get(str[j]);
      if (num % 2 !== 0) {
        return false;
      }
    }
    return true;
  } // if str length is odd, evaluate lettermap here
  else {
    let count = 0;
    for (let k = 0; k < str.length; k++) {
      const num = letterMap.get(str[k]);
      if (num % 2 !== 0) {
        count++;
      }
    }
    if (count > 1) {
      return false;
    } else {
      return true;
    }
  }
}

// console.log(palindrome('acecarr'));

// 6. anagrams

function anagrams(words) {
  let result = [];
  const groups = new Map();

  words.forEach(word => {
    const reArranged = word.split('').sort().join('');
    let curr = groups.get(reArranged);
    if (curr === undefined) {
      groups.set(reArranged, [word]);
    } else {
      const arr = [ ...curr, word];
      groups.set(reArranged, arr);
    }
  });

  for (let value of groups.values()) {
    result.push(value);
  }
  return result;
}

// console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));


// 7. separate chaining version of HashMaps

class HashMapChained {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const node = this._findNode(key);
    if (node === null) {
      throw new Error('Key error');
    }
    return node.value;
  }

  set(key, value){
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    //Find the slot where this key should be in
    const index = this._findSlot(key);

    if (this._hashTable[index] === undefined) {
      this._hashTable[index] = new LinkedList();
    }

    // !this._hashTable[index] || this._hashTable[index] === undefined || this._hashTable[index] === null

    if (this._findNode(key) === null) {
      this.length++;
      this._hashTable[index].insertLast({
        key,
        value,
        deleted: false
      });
    } else {
      let node = this._hashTable[index].find(key);
      console.log(node);
      node.value = { key, value, deleted: false };
    }
  }

  delete(key) {
    const index = this._findSlot(key);
    this._hashTable[index].delete(key);

    // const slot = this._hashTable[index];
    // if (slot === undefined) {
    //   throw new Error('Key error');
    // }
    // slot.DELETED = true;
    // this.length--;
    // this._deleted++;
  }

  _findNode(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] !== undefined) {
      const response = this._hashTable[index].find(key);
      return response;
    } else {
      return null;
    }
  }

  _findSlot(key) {
    const hash = HashMapChained._hashString(key);
    console.log(hash % this._capacity);
    return hash % this._capacity;

    // for (let i=start; i<start + this._capacity; i++) {
    //   const index = i % this._capacity;
    //   const slot = this._hashTable[index];
    //   if (slot === undefined || (slot.key === key && !slot.DELETED)) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        let currNode = slot.head;
        while (currNode !== null) {
          this.set(currNode.value.key, currNode.value.value);
          currNode = currNode.next;
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMapChained.MAX_LOAD_RATIO = 0.5;
HashMapChained.SIZE_RATIO = 3;

let lorChained = new HashMapChained();

lorChained.set('Hobbit', 'Bilbo');
lorChained.set('Hobbit', 'Frodo');
lorChained.set('Wizard', 'Gandolf');
lorChained.set('Human', 'Aragon');
lorChained.set('Elf', 'Legolas');
lorChained.set('Maiar', 'The Necromancer');
lorChained.set('Maiar', 'Sauron');
lorChained.set('RingBearer', 'Gollum');
lorChained.set('LadyOfLight', 'Galadriel');
lorChained.set('HalfElven', 'Arwen');
lorChained.set('Ent', 'Treebeard');

console.log(JSON.stringify(lorChained.get('Hobbit'), null, 2));
// console.log(lorChained._hashTable[1]);
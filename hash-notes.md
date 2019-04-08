# Hash Maps

Map keys to values; an "associative array", "dictionary"
**access by key**
{
  firstName: 'bill',
  lastName: 'jones',
  age: 32,
  isAdmin: true
}

## What makes hash maps?

* Hashing: It is the process of mapping a key to a position in the hash table.
* Hash Table: A hash table is a storage that holds the records (the key and any value associated with the key).
* Hash Function: A hash function maps keys to positions in the hash table. 

## Hash Functions

*What makes a good hash function?*
* Convert data of an arbitrary size to data of a fixed size
  * E.g. Any string to a 32-bit integer
* The same input will always give the same output
* Perfect hash function is the ideal
  * Satisfies (approximately) the assumption of uniform hashing: each key is equally likely to hash to any of the n slots,        independently of where any other key has hashed to
  * Attempts to distribute the keys as evenly as possible among slots in the hash table
* Equal distribution of outputs given random inputs

````js
//When the key is a number

function simpleHashFunction(Number) {
    return Number % hashTable.length;
}

//when the key is a string
/*
const obj = {
    key: 'david',
    value: 'vocals'
};
Take the ASCII value of each character and add them up
*/

function simpleHashFunction(String) {
    let total = 0;
    for (let i = 0; i < String.length; i++) {
        total += String.charCodeAt(i);
    }
    return total % hashTable.length;
} 
````


## String -> Int hash function

````js
function hashString(string) {
  // use prime number for more equitable distribution
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
        // left shift by 5?
        hash = (hash << 5) + hash + string.charCodeAt(i);
        // ampersand
        hash = hash & hash;
    }
    return hash >>> 0;
};
````


## Inserting into a hash map

````js
const obj = {
    key: 'david',
    value: 'vocals'
};

const hash = hashString(obj.key); // 256362285

const index = hash % capacity; // 3
````
maps into the index 3 of the hash map...


## Dealing with collisions (open addressing)

````js
const obj = {
    key: 'gregg',
    value: 'drums'
};

const hash = hashString(obj.key); // 260512401

const index = hash % capacity; // 3
````

if it already has a value in the map, it gets moved to the next available slot...
makes hash function an O(n) rather than O(1) as it then has to iterate to find the next available slot.

## Lookup (open addressing)

````js
const obj = {
    key: 'gregg'
};

const hash = hashString(obj.key); // 260512401

const index = hash % capacity; // 3
````

## Dealing with collisions (separate chaining)

separate chaining is more scalable
use a **linked list** at index to point to the other key value


## Lookup (separate chaining)

refer to index, then to linked list reference format like 'next' to get values next to first key


## Performance

* The fuller the hash map, the higher the chance of collisions
* Collisions slow things down - *O(n) to find an empty space*
* Solution: Introduce a maximum loading factor
  * When hash map is more than x% full, move everything into a larger array

## Removing values

* Separate chaining
  * Find the key in the linked list
  * Remove the item from the linked list
* Open addressing
  * Set a flag which says that the key has been removed
  * Don't copy it over on resize
  * Or, remove and rearrange
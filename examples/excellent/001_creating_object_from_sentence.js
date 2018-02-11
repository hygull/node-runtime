/**
	{
		"createdOn": "11 Feb 2018",
		"createdBy": "Rishikesh Agrawani"
	}
*/

// Creating an object containing the frequencies of each unique word 
// of any sentence/string using javascript

var s = "Rishikesh is goal    and game is google on MAM  MAP is \
great MAM Rishikesh goal goal goal game now but now great";

obj = {} 

words = s.split(" ").filter(item => item !== "")

words.forEach(item => {
    if(obj[item]) {
        obj[item] = obj[item] + 1
    } 
    else 
    	obj[item] = 1 
});

console.log(obj)

/*

D:\projects\NodeJS>node 001_creating_object_from_sentence.js
{ Rishikesh: 2,
  is: 3,
  goal: 4,
  and: 1,
  game: 2,
  google: 1,
  on: 1,
  MAM: 2,
  MAP: 1,
  great: 2,
  now: 2,
  but: 1 }

D:\projects\NodeJS>

*/
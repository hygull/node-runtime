/**
	{
		"date_of_creation": "27 Aug 2017",
		"aim_of_script": "To count number of each words"
		"coded_by": "Rishikesh Agrawani"
	}
*/
var data = {}
var sentence = "Ram is a good boy. It is not a chance but good. That is special. I like That"
var arr = sentence.split(" ")
console.log(arr)

for(var item of arr){
	if(data[item] === undefined){
		data[item] = 1
	} else {
		data[item] += 1
	}
}

console.log("\n")
console.log(data)

/*
[ 'Ram',
  'is',
  'a',
  'good',
  'boy.',
  'It',
  'is',
  'not',
  'a',
  'chance',
  'but',
  'good.',
  'That',
  'is',
  'special.',
  'I',
  'like',
  'That' ]


{ Ram: 1,
  is: 3,
  a: 2,
  good: 1,
  'boy.': 1,
  It: 1,
  not: 1,
  chance: 1,
  but: 1,
  'good.': 1,
  That: 2,
  'special.': 1,
  I: 1,
  like: 1 }
*/
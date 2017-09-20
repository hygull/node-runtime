# Mocha - testing framework

Visit [official webiste](https://mochajs.org/)

# Chai - assertion library

Visit [official webiste](http://chaijs.com/)

**Chai** is optional, as node.js has assertion library by default

Visit [here](http://chaijs.com/api/assert/) to check **Chai Assertion library**

# How to do

*	Create any folder named **test1**

*	cd test1

*	npm init 

```
	Give simple description, author name etc, specify app.js as root, then accept defaults
```

*	npm install mocha chai --save-dev

*	Change the value of 'test' key to 'mocha' in package.json

```
	{
		...
		...
		"scripts": {
		    "test": "mocha"
		  }
		...
		...
	}
```

*	Create app.js

*	Create test directory(by default mocha is gonna look for directory called test)

*	Create test/appTesting.js

```javascript
/* 
	app.js 
*/

module.exports = function(){
	return "Hello coders"
}
```


```javascript
/* 
	test/appTesting.js 
*/

const assert = require("chai").assert;

const app = require("../app")

describe("Hello App", function(){
	it("It should return 'Hello coders'", function(){
		assert.equal(app(), "Hello coders")
	})
})
```


*	Finally run **npm run test** from **test1** folder

```typescript
MacBook-Pro-2:test1 admin$ npm run test

> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> Mocha



  Hello App
    ✓ It should return 'Hello coders'


  1 passing (6ms)

MacBook-Pro-2:test1 admin$ 
```

*	Now change the code of **appTesting.js**

```typescript
/* 
	test/appTesting.js 
*/

const assert = require("chai").assert;

const app = require("../app")



describe("Hello App", function(){
		it("It should return 'Hello coders'", function(){
			assert.equal(app(), "Hello coders")
		})
})

describe("Hello App", function(){
		it("It should return 'Hello coders'", function(){
			assert.equal(app(), "Hello doctors")
		})
})
```

*	Then again **run** like below

```typescript
MacBook-Pro-2:test1 admin$ npm run test

> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> Mocha



  Hello App
    ✓ It should return 'Hello coders'

  Hello App
    1) It should return 'Hello coders'


  1 passing (8ms)
  1 failing

  1) Hello App It should return 'Hello coders':

      AssertionError: expected 'Hello coders' to equal 'Hello doctors'
      + expected - actual

      -Hello coders
      +Hello doctors
      
      at Context.<anonymous> (test/appTesting.js:15:11)



npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! test1@1.0.0 test: `Mocha`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the test1@1.0.0 test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/admin/.npm/_logs/2017-09-18T18_22_36_998Z-debug.log
MacBook-Pro-2:test1 admin$  
```

Try **npm run test -s**, you won't be able to see **ERR** messages like the above one

Better is to not do like this.

```
MacBook-Pro-2:test1 admin$ npm run test -s


  Hello App
    ✓ It should return 'Hello coders'

  Hello App
    1) It should return 'Hello coders'


  1 passing (8ms)
  1 failing

  1) Hello App It should return 'Hello coders':

      AssertionError: expected 'Hello coders' to equal 'Hello doctors'
      + expected - actual

      -Hello coders
      +Hello doctors
      
      at Context.<anonymous> (test/appTesting.js:15:11)



MacBook-Pro-2:test1 admin$ 
```

Now again change the value of **'test'** key to **'mocha || true'** to get rid of adding **-s** switch again & again in each command

```
	{
		...
		...
		"scripts": {
		    "test": "mocha || true"
		  }
		...
		...
	}
```

Then run **npm run test**

```
MacBook-Pro-2:test1 admin$ npm run test

> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> mocha || true



  Hello App
    ✓ It should return 'Hello coders'

  Hello App
    1) It should return 'Hello coders'


  1 passing (8ms)
  1 failing

  1) Hello App It should return 'Hello coders':

      AssertionError: expected 'Hello coders' to equal 'Hello doctors'
      + expected - actual

      -Hello coders
      +Hello doctors
      
      at Context.<anonymous> (test/appTesting.js:15:11)



MacBook-Pro-2:test1 admin$ 
```

**Almost same, Right!!!**

**Let's move on!!!**

## Testing multiple functions

Now paste the below code on **app.js** of **test1** directory(I have commented few lines)

```javascript
const assert = require("chai").assert;

const app = require("../app")


describe("Hello App", function(){
		it("It should return 'Hello coders'", function(){
			assert.equal(app(), "Hello coders")
		})
})

// describe("Hello App", function(){
// 		it("It should return 'Hello coders'", function(){
// 			assert.equal(app(), "Hello doctors")
// 		})
// })
```

After that create a new file names **arithmetic.js** in the same directory and paste the following code(Also try to understand it)

```javascript
var obj = {}

obj["addition"] = function(num1, num2){
					return num1+num2
				}

obj["subtraction"] = function(num1, num2){
					return num1-num2
				}

obj["multiplication"] = function(num1, num2){
					return num1*num2
				}

obj["division"] = function(num1, num2){
					return num1/num2
				}

obj["isDivisorNotZero"] = function(num1, num2){
	if (num2 === 0) {
		return false
	}
	return true
}

module.exports = obj
```

Now create a testing file named **arithmeticTesting.js** inside **test1/test** directory

```javascript
const assert = require("chai").assert;

const obj = require("../arithmetic")

//Addition
describe("Arithmetic operations:-", function(){
	describe("Addition", function(){
		it("addition(10, 5) equals 15", function(){
			let result = obj.addition(10, 5)
			assert.equal(result, 15)
		})

		it("addition(10, 5) is greater than 10", function(){
			let result = obj.addition(10, 5)
			assert.isAbove(result, 10)
		})

		it("addition(10, 5) returns a number", function(){
			let result = obj.addition(10, 5)
			assert.typeOf(result, "number")
		})
	})

	//Subtraction
	describe("Subtraction", function(){
		it("subtraction(10, 5) equals 5", function(){
			let result = obj.subtraction(10, 5)
			assert.equal(result, 5)
		})

		it("subtraction(10, 5) is less than 8", function(){
			let result = obj.subtraction(10, 5)
			assert.isBelow(result, 8)
		})

		it("subtraction(10, 5) returns a number", function(){
			let result = obj.subtraction(10, 5)
			assert.typeOf(result, "number")
		})
	})

	//Multiplication
	describe("Multiplication", function(){
		it("multiplication(10, 5) equals 50", function(){
			let result = obj.multiplication(10, 5)
			assert.equal(result, 50)
		})

		it("multiplication(10, 5) is less than 51", function(){
			let result = obj.multiplication(10, 5)
			assert.isBelow(result, 51)
		})

		it("multiplication(10, 5) returns a number", function(){
			let result = obj.multiplication(10, 5)
			assert.typeOf(result, "number")
		})
	})

	//Divison
	describe("Division", function(){
		it("isDivisorNotZero(10, 5) returns true", function(){
			let result = obj.isDivisorNotZero(10, 5)
			assert.equal(result, true)
		})

		it("divison(10, 5) equals 2", function(){
			let result = obj.division(10, 5)
			assert.equal(result, 2)
		})
	})
})
```

Finally run **npm run test**, you will see **output** something like below(Do not bother about path, it will be different in your case)

```
> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> mocha || true



  Hello App
    ✓ It should return 'Hello coders'

  Arithmetic operations:-
    Addition
      ✓ addition(10, 5) equals 15
      ✓ addition(10, 5) is greater than 10
      ✓ addition(10, 5) returns a number
    Subtraction
      ✓ subtraction(10, 5) equals 5
      ✓ subtraction(10, 5) is less than 8
      ✓ subtraction(10, 5) returns a number
    Multiplication
      ✓ multiplication(10, 5) equals 50
      ✓ multiplication(10, 5) is less than 51
      ✓ multiplication(10, 5) returns a number
    Division
      ✓ isDivisorNotZero(10, 5) returns true
      ✓ divison(10, 5) equals 2


  12 passing (10ms)

```

# TODO

```
typeOf()

isAbove()

equal()

isUndefined()

isDefined()
```

# WHAT I HAVE TO FOLLOW

```javascript
	var app = require("../app").sum
```

```javascript
	var app = require("../app")

	var s = app.sum()
```

```
	var result = sum()
```






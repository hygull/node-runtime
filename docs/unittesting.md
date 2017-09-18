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

Try **npm run test -s**, you won't be able to see ERR messages like the above one

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

Now again change the value of 'test' key to 'mocha || true'

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

**Let's move on**





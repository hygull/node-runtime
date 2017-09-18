# Mocha - testing framework

Visit [official webiste](https://mochajs.org/)

# Chai - insertion library

Visit [official webiste](http://chaijs.com/)

**Chai** is optional, as node.js has assertion library by default

visit [here](http://chaijs.com/api/assert/) to check **Chai Assertion library**

# How to do

*	Create any folder named **test1**

*	cd test1

*	npm init 

Give simple description, author name etc, specify app.js as root, then accept defaults

*	npm install mocha chai --save-dev

*	Create app.js

*	Create test directory(by default mocha is gonna look for directory called test)

*	Create test/appTesting.js

```javascript
/* app.js */

module.exports = function(){
	return "Hello coders"
}
```


```javascript
/* test/appTesting.js */

const assert = require("chai").assert;

const app = require("../app")

describe("Hello App", function(){
	it("It should return 'Hello coders'", function(){
		assert.equal(app(), "Hello coders")
	})
})
```


*	Finally run **npm run test** from test1 folder

```typescript
MacBook-Pro-2:test1 admin$ npm run test

> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> Mocha



  Hello App
    ✓ It should return 'Hello coders'


  1 passing (6ms)

MacBook-Pro-2:test1 admin$ 
```

*	Now change the code of appTesting.js

```typescript
/* test/appTesting.js */

const assert = require("chai").assert;

const app = require("../app")

var messages = ["Hello coders", "Hello programmers"]

for(var message of messages)
	describe("Hello App", function(){
		it("It should return 'Hello coders'", function(){
			assert.equal(app(), message)
		})
	})
```

*	Then again run like below

```typescript
MacBook-Pro-2:test1 admin$ npm run test

> test1@1.0.0 test /Users/admin/projects/Node/node-runtime/unittest/mocha/test1
> Mocha



  Hello App
    1) It should return 'Hello coders'

  Hello App
    2) It should return 'Hello coders'


  0 passing (9ms)
  2 failing

  1) Hello App It should return 'Hello coders':

      AssertionError: expected 'Hello coders' to equal 'Hello programmers'
      + expected - actual

      -Hello coders
      +Hello programmers
      
      at Context.<anonymous> (test/appTesting.js:10:11)

  2) Hello App It should return 'Hello coders':

      AssertionError: expected 'Hello coders' to equal 'Hello programmers'
      + expected - actual

      -Hello coders
      +Hello programmers
      
      at Context.<anonymous> (test/appTesting.js:10:11)



npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! test1@1.0.0 test: `Mocha`
npm ERR! Exit status 2
npm ERR! 
npm ERR! Failed at the test1@1.0.0 test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/admin/.npm/_logs/2017-09-18T18_15_55_279Z-debug.log
MacBook-Pro-2:test1 admin$ 
```
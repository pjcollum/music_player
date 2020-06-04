const app = require('../test.js');      //no need for .js at the end
// 'app' is global... '../app' is local

// with testing, assertions need to be made

test('should show that number 1 and number 2 equals 8 when 5 and 3 are passed', () => {
    //comment here
    expect(app.add(5, 3)).toBe(8)
})
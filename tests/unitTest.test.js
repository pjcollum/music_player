const app = require('./unitTest');      


//Working Tests
test('should show that 61 seconds is equal to one minute one second', () => {
    expect(app.formatTime(61)).toBe("0:01:01")
})

test('should show that 60 seconds is equal to one minute', () => {
    expect(app.formatTime(60)).toBe("0:01:00")
})

test('should show that 3601 seconds is equal to one hour and one second', () => {
    expect(app.formatTime(3601)).toBe("1:00:01")
})

test('should contain Summer in array', () => {
    expect(app.songLibrary[1].songName).toContain("Summer")
});

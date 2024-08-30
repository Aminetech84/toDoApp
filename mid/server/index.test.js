const add = require('./index')

test('Should show sum', () => {
    expect(add(4, 5)).toBe(9);
});

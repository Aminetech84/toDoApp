const sum = require('./ops');

test('Should show correct sum ', () => {
  expect(sum(1, 5)).toBe(6);
});

test('Should show correct sum ', () => {
  expect(sum(null, 5)).toBe(5);
});
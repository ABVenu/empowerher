const sum = require("..");



test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

test('Checking for Non Number Data Type', ()=>{
  expect(sum("Yes", "No")).toBe("Invalid Data Type");
})
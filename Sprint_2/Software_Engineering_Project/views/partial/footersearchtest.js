const assert = require('chai').assert;
const enterID = require('../../app.js');


// describe('footersearch', () => {
//   it('should return the uid of the user', () => {
//     const uid = '123';
//     const user = { uid };
//     const auth = { currentUser: user };
//     const result = getUID(auth);
//     expect(result).toEqual(uid);
//     console.log(result); 
//   });
// });

describe('footersearch', () => {
  it('should allow data insertion', () => {
  assert.equal(enterID('123'), '123');
  expect (enterID('123')).toEqual('123');
  
  });
});

describe('footersearch', () => {
  it('should allow name insertion', () => {
  assert.equal(enterName('Mario64'), 'Mario64');
  expect (enterName('Mario64')).toEqual('Mario64');

  });
});

describe('footersearch', () => {
  it('should allow type insertion', () => {
  assert.equal(enterType('30'), '30');
  expect (enterType('30')).toEqual('30');

  });
});

describe('footersearch', () => {
  it('should allow age insertion', () => {
  assert.equal(enterAge('19'), '19');
  expect (enterAge('19')).toEqual('19');

  });
});

describe('footersearch', () => {
  it('should allow system insertion', () => {
  assert.equal(enterSystem('Nintendo64'), 'Nintendo64');
  expect (enterSystem('Nintendo64')).toEqual('Nintendo64');

  });
});

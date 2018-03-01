const test = require('tape');
const fromIter = require('./index');

test('it sends array items (iterable) to a puller sink', t => {
  t.plan(13);
  const source = fromIter([10, 20, 30]);

  const downwardsExpectedTypes = [
    [0, 'function'],
    [1, 'number'],
    [1, 'number'],
    [1, 'number'],
    [2, 'undefined'],
  ];
  const downwardsExpected = [10, 20, 30];

  let talkback;
  source(0, (type, data) => {
    const et = downwardsExpectedTypes.shift();
    t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
    t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);

    if (type === 0) {
      talkback = data;
      talkback(1);
      return;
    }
    if (type === 1) {
      const e = downwardsExpected.shift();
      t.equals(data, e, 'downwards data is expected: ' + e);
      talkback(1);
    }
  });
});

test('it sends array entries (iterator) to a puller sink', t => {
  t.plan(13);
  const source = fromIter(['a', 'b', 'c'].entries());

  const downwardsExpectedTypes = [
    [0, 'function'],
    [1, 'object'],
    [1, 'object'],
    [1, 'object'],
    [2, 'undefined'],
  ];
  const downwardsExpected = [[0, 'a'], [1, 'b'], [2, 'c']];

  let talkback;
  source(0, (type, data) => {
    const et = downwardsExpectedTypes.shift();
    t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
    t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);

    if (type === 0) {
      talkback = data;
      talkback(1);
      return;
    }
    if (type === 1) {
      const e = downwardsExpected.shift();
      t.deepEquals(data, e, 'downwards data is expected: ' + e);
      talkback(1);
    }
  });
});

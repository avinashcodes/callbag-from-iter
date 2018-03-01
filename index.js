const fromIter = iter => (start, sink) => {
  if (start !== 0) return;
  const iterator =
    typeof Symbol !== 'undefined' && iter[Symbol.iterator]
      ? iter[Symbol.iterator]()
      : iter;

      
  sink(0, (t,d) => {
    if (t === 1) {
      let res = iterator.next();
      if (res.done) sink(2);
      else sink(1, res.value);
    }
  });
};

module.exports = fromIter;

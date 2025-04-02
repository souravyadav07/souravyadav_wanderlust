// function wrapAsync(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch((err) => next(err));                     // if catch err then execute next(err)
//   };
// }

// for simplicity

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

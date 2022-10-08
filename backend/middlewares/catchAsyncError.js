
// catchAsync error
// exports.catchAsyncError = (fn) => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(next);
//     }
// }

// catchAsync error
// module.exports = func => (req, res, next) => 
//   Promise.resolve(func(req, res, next))
//    .catch(next);

// module.exports = fn => (req, res, next) => {
//     return Promise
//         .resolve(fn(req, res, next))
//         .catch(next);
// };

// module.exports = catchAsyncError;
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
      return next(Error('not authorized'));
    }
    next();
  };
  
  const isLoggedIn = (req, res, next) => {
    if (!req.user) {
      const error = Error('not authorized');
      error.status = 401;
      return next(error);
    }
    next();
  };

  module.exports = {
      isAdmin,
      isLoggedIn
  }
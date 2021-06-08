exports.originMiddleware = (req, res, next) => {
  if (!req.headers['allowed-from'] || req.headers['allowed-from'] != 'SPECTRE461') {
    return res.status(422).json({
      error: 'Invalid Authorized App',
    });
  }

  next();
};

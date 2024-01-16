const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).send('Unauthorized');
}
  
const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send('Already logged In');
    }
    next();
}

module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}
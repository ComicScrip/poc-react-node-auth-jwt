const User = require('../models/user.model.js');

module.exports = async (req, res, next) => {
  const decodedToken = req.token;
  if (!decodedToken) {
    res.sendStatus(401);
  } else {
    try {
      const userRecord = await User.findById(decodedToken.id)
      if (userRecord) {
        req.currentUser = userRecord;
        next()
      } else {
        res.sendStatus(401);
      } 
    } catch(err) {
      console.error(err)
      res.sendStatus(401);
    }
  }
}
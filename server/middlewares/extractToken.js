const expressJWT = require('express-jwt');
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

module.exports = expressJWT({
  secret: JWT_PRIVATE_KEY,
  requestProperty: 'token',
  credentialsRequired: false
})
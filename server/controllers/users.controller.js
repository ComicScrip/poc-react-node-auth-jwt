const User = require('../models/user.model.js');

class usersController {
  static async create (req, res) {
    const clientPayload = req.body;

    const isNotEmptyStirng = (str) => {
      return typeof str === 'string' && str.length > 0
    }
    if (!isNotEmptyStirng(clientPayload.name) || !isNotEmptyStirng(clientPayload.email) || !isNotEmptyStirng(clientPayload.password)) {
      return res.status(422).send({errorMessage: 'a required attribute is missing'})
    }

    const createdUser = await User.create(clientPayload.name, clientPayload.email, clientPayload.password)
    res.status(201).send(createdUser)
  }
}

module.exports = usersController;

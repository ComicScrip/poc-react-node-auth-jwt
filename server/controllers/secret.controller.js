class secretController {
  static async show (req, res) {
    res.send({secret: req.currentUser.name})
  }
}

module.exports = secretController;

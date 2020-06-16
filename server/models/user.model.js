const db = require('../db.js');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

class User {
  static async create (name, email, password) {
    
  }

  static async findById (id) {
    
  }

  static async findByEmail (email) {
    
  }
  
  static async login(email, password) {
    
  }
}

module.exports = User;

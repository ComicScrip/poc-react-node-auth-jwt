const db = require('../db.js');
const Joi = require('@hapi/joi');

class Task {
  constructor (task) {
    this.id = task.id;
    this.name = task.name;
    this.done = !!task.done;
  }

  static validate(attributes, forCreation = true) {
    const schema = Joi.object({
      name: Joi.string().min(1).max(30),
      done: Joi.bool().optional(),
    });
    return schema.validate(attributes, {abortEarly: false, presence: forCreation ? 'required' : 'optional'})
  }

  static async create (newTask) {
    return db.query('insert into tasks set ?', newTask)
      .then(res => { newTask.id = res.insertId; return new Task(newTask); });
  }

  static async findById (id) {
    return db.query('select * from tasks where id = ?', [id])
      .then(rows => rows[0] ? new Task(rows[0]) : null);
  }

  static async nameAlreadyExists (name) {
    return db.query('select count(id) as count FROM tasks WHERE name = ?', [name]).then(rows => {
      if (rows[0].count) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  }

  static async getSome (limit, offset) {
    const total = await db.query('select count(id) as count from tasks').then(rows => rows[0].count);
    let sql = 'select * from tasks'
    if (limit !== undefined && offset !== undefined) {
      sql = `${sql} limit ${limit} offset ${offset}`
    }

    return db.query(sql).then(rows => ({
      results: rows.map(t => new Task(t)),
      total
    }));
  }

  static async updateById (id, task) {
    return db.query('UPDATE tasks SET ? WHERE id = ?', [task, id]).then(() => this.findById(id));
  }

  static async deleteById (id) {
    return db.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
}

module.exports = Task;

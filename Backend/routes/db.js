
import { Low, JSONFile } from 'lowdb/lib'


// Use JSON file for storage

const db = new Low(new JSONFile("db.json"))

module.exports = { db };

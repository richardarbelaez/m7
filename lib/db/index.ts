import Database from 'better-sqlite3'
import { schema } from './schema'

const db = new Database('mycompany.db')

// Initialize database with schema
db.exec(schema)

// Insert default users if they don't exist
const defaultUsers = [
  {
    id: '1',
    email: 'admin@mycompany.com',
    password: 'admin123', // In production, this should be hashed
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@mycompany.com',
    password: 'user123', // In production, this should be hashed
    role: 'user'
  }
]

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (id, email, password, role)
  VALUES (@id, @email, @password, @role)
`)

defaultUsers.forEach(user => insertUser.run(user))

export { db }
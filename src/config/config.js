import { config } from 'dotenv'
config()
export const DB_LOCALHOST = process.env.DB_LOCALHOST
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_PORT = process.env.DB_PORT
export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET
export const ALLOWED_ORIGINS = [undefined, 'http://localhost:5173']

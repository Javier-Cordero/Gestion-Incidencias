import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import userRoutes from './routes/users.routes.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))

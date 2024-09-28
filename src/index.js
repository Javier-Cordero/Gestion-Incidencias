import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import userRoutes from './routes/users.routes.js'
import reportRoutes from './routes/report.routes.js'
import stateRoutes from './routes/state.routes.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/states', stateRoutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))

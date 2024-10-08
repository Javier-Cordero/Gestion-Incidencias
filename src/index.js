import express from 'express'
import morgan from 'morgan'
import { PORT } from './config/config.js'
import { validateCORS } from './middlewares/cors.middleware.js'
import userRoutes from './routes/users.routes.js'
import reportRoutes from './routes/report.routes.js'
import stateRoutes from './routes/state.routes.js'
import detailRoutes from './routes/details.routes.js'
import roleRoutes from './routes/role.routes.js'
import authRoutes from './routes/auth.routes.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(validateCORS)
app.use('/api/users', userRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/states', stateRoutes)
app.use('/api/details', detailRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))

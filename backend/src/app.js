import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import authRoutes from './routes/authRoutes.js'
import schemeRoutes from './routes/schemeRoutes.js'

dotenv.config()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.status(200).json({ message: 'API is running.' })
})

app.use('/api/auth', authRoutes)
app.use('/api/schemes', schemeRoutes)

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error.',
  })
})

export default app

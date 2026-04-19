import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import app from './src/app.js'
import connectDB from './src/config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

const PORT = process.env.PORT || 5001

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start backend:', error.message)
    process.exit(1)
  }
}

startServer()

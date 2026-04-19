import { Router } from 'express'
import { recommendSchemes } from '../controllers/schemeController.js'

const router = Router()

router.post('/recommend', recommendSchemes)

export default router

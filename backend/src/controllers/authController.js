import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const formatUserResponse = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
})

export const registerUser = async (request, response, next) => {
  try {
    const { fullName, email, password } = request.body

    if (!fullName || !email || !password) {
      return response.status(400).json({
        message: 'Full name, email, and password are required.',
      })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })

    if (existingUser) {
      return response.status(409).json({
        message: 'An account with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    return response.status(201).json({
      message: 'Registration successful.',
      user: formatUserResponse(user),
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body

    if (!email || !password) {
      return response.status(400).json({
        message: 'Email and password are required.',
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return response.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return response.status(401).json({
        message: 'Invalid email or password.',
      })
    }

    return response.status(200).json({
      message: 'Login successful.',
      user: formatUserResponse(user),
    })
  } catch (error) {
    next(error)
  }
}

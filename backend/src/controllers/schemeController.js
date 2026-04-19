import { getSchemeRecommendations } from '../services/groqService.js'
import { getBasicRecommendations, getSchemesWithRefresh } from '../services/schemeService.js'

function validateProfile(body) {
  return {
    age: body.age ?? '',
    income: body.income ?? body.annualFamilyIncome ?? '',
    state: body.state ?? '',
    category: body.category ?? '',
    gender: body.gender ?? '',
  }
}

export async function recommendSchemes(request, response, next) {
  try {
    const userProfile = validateProfile(request.body)
    const schemes = await getSchemesWithRefresh()

    try {
      const recommendations = await getSchemeRecommendations(userProfile, schemes)

      return response.status(200).json({
        recommendations,
        usedFallback: false,
      })
    } catch (groqError) {
      const fallbackRecommendations = getBasicRecommendations(userProfile, schemes)

      return response.status(200).json({
        recommendations: fallbackRecommendations,
        usedFallback: true,
        message: 'AI recommendations are temporarily unavailable. Showing basic matched schemes.',
        aiError: groqError.message,
      })
    }
  } catch (error) {
    next(error)
  }
}

function extractJsonArray(text) {
  const cleanedText = text.trim()

  try {
    return JSON.parse(cleanedText)
  } catch {
    const firstBracketIndex = cleanedText.indexOf('[')
    const lastBracketIndex = cleanedText.lastIndexOf(']')

    if (firstBracketIndex === -1 || lastBracketIndex === -1) {
      throw new Error('Groq response did not contain JSON array output.')
    }

    return JSON.parse(cleanedText.slice(firstBracketIndex, lastBracketIndex + 1))
  }
}

export async function getSchemeRecommendations(userProfile, schemesData) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured.')
  }

  const prompt = `
You are helping a MERN app called Yojana Setu recommend government schemes.

User profile:
${JSON.stringify(userProfile, null, 2)}

Available scheme data:
${JSON.stringify(schemesData, null, 2)}

Task:
1. Choose only the most relevant schemes for this user profile.
2. Explain why each scheme matches in simple language.
3. Keep only data supported by the provided scheme list.
4. Return ONLY valid JSON array.

Required JSON format:
[
  {
    "name": "Scheme name",
    "description": "Short description",
    "eligibilityReason": "Why it matches",
    "applyLink": "https://official-link",
    "deadline": "2026-12-31",
    "steps": ["Step 1", "Step 2", "Step 3"]
  }
]
`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'You recommend schemes strictly from provided data and return only valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Groq API error: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('Groq API returned an empty response.')
  }

  return extractJsonArray(content)
}

import Scheme from '../models/Scheme.js'
import { isStale } from '../utils/schemeFreshness.js'

const seedSchemes = [
  {
    name: 'PM Awas Yojana',
    description: 'Housing support scheme for eligible low and middle-income households.',
    category: 'EWS',
    gender: 'Any',
    state: 'Any',
    incomeLimit: 300000,
    applyLink: 'https://pmaymis.gov.in/',
    deadline: '2026-12-31',
  },
  {
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support scheme for eligible farmer families across India.',
    category: 'General',
    gender: 'Any',
    state: 'Any',
    incomeLimit: 1000000,
    applyLink: 'https://pmkisan.gov.in/',
    deadline: '2026-03-31',
  },
  {
    name: 'Post Matric Scholarship',
    description: 'Scholarship support for eligible students from reserved categories.',
    category: 'SC',
    gender: 'Any',
    state: 'Any',
    incomeLimit: 250000,
    applyLink: 'https://scholarships.gov.in/',
    deadline: '2026-10-31',
  },
  {
    name: 'Atal Pension Yojana',
    description: 'Pension scheme for workers in the unorganised sector and self-employed citizens.',
    category: 'General',
    gender: 'Any',
    state: 'Any',
    incomeLimit: 800000,
    applyLink: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    deadline: 'Open',
  },
  {
    name: 'Mukhyamantri Kanya Vivah Yojana',
    description: 'Financial assistance for eligible women beneficiaries in selected states.',
    category: 'Women',
    gender: 'Female',
    state: 'Bihar',
    incomeLimit: 300000,
    applyLink: 'https://serviceonline.bihar.gov.in/',
    deadline: '2026-09-30',
  },
  {
    name: 'PM Ujjwala Yojana',
    description: 'LPG connection support for eligible low-income households.',
    category: 'OBC',
    gender: 'Female',
    state: 'Any',
    incomeLimit: 300000,
    applyLink: 'https://www.pmuy.gov.in/',
    deadline: 'Open',
  },
]

async function ensureSeedSchemes() {
  const schemeCount = await Scheme.countDocuments()

  if (schemeCount === 0) {
    await Scheme.insertMany(seedSchemes)
  }
}

export async function getSchemesWithRefresh() {
  await ensureSeedSchemes()

  const schemes = await Scheme.find().lean()

  const refreshOperations = schemes
    .filter((scheme) => isStale(scheme.lastUpdated))
    .map((scheme) =>
      Scheme.findByIdAndUpdate(
        scheme._id,
        {
          $set: {
            lastUpdated: new Date(),
          },
        },
        { new: true },
      ).lean(),
    )

  if (refreshOperations.length > 0) {
    await Promise.all(refreshOperations)
  }

  return Scheme.find().sort({ name: 1 }).lean()
}

export function getBasicRecommendations(userProfile, schemesData) {
  const normalizedCategory = userProfile.category?.trim()
  const normalizedGender = userProfile.gender?.trim()
  const normalizedState = userProfile.state?.trim()
  const income = Number(userProfile.income)

  return schemesData
    .filter((scheme) => {
      const schemeGender = scheme.gender || 'Any'

      const categoryMatches =
        !normalizedCategory ||
        scheme.category === 'Any' ||
        scheme.category.toLowerCase() === normalizedCategory.toLowerCase()

      const genderMatches =
        !normalizedGender ||
        schemeGender === 'Any' ||
        schemeGender.toLowerCase() === normalizedGender.toLowerCase()

      const stateMatches =
        !normalizedState ||
        scheme.state === 'Any' ||
        scheme.state.toLowerCase() === normalizedState.toLowerCase()

      const incomeMatches =
        !Number.isFinite(income) || !scheme.incomeLimit || income <= scheme.incomeLimit

      return categoryMatches && genderMatches && stateMatches && incomeMatches
    })
    .map((scheme) => ({
      name: scheme.name,
      description: scheme.description,
      eligibilityReason: `Matches the selected${normalizedCategory ? ` category ${normalizedCategory}` : ' category'}${normalizedGender ? `, gender ${normalizedGender}` : ''}${normalizedState ? `, and state ${normalizedState}` : ''}${Number.isFinite(income) && scheme.incomeLimit ? `, and falls within the income limit of Rs. ${scheme.incomeLimit.toLocaleString('en-IN')}` : ''}.`,
      applyLink: scheme.applyLink,
      deadline: scheme.deadline,
      steps: [
        'Open the official application page.',
        'Review eligibility and prepare the required documents.',
        'Complete and submit the application form on the official portal.',
      ],
      lastUpdated: scheme.lastUpdated,
    }))
}

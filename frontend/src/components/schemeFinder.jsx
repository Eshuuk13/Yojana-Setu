import { useMemo, useState } from 'react'

const schemes = [
  {
    name: 'PM Kisan Samman Nidhi',
    description: 'Income support for eligible farmer families.',
    minAge: 18,
    maxIncome: 1000000,
    categories: ['Any'],
    states: ['Any'],
    occupations: ['Farmer'],
    benefit: 'Direct income support of Rs. 6,000 per year in installments.',
  },
  {
    name: 'Post Matric Scholarship',
    description: 'Scholarship support for eligible students from reserved categories.',
    minAge: 16,
    maxIncome: 250000,
    categories: ['SC', 'ST', 'OBC'],
    states: ['Any'],
    occupations: ['Student'],
    benefit: 'Helps eligible students cover study-related expenses after Class 10.',
  },
  {
    name: 'Atal Pension Yojana',
    description: 'Pension scheme for workers in the unorganised sector.',
    minAge: 18,
    maxAge: 40,
    maxIncome: 800000,
    categories: ['Any'],
    states: ['Any'],
    occupations: ['Self-Employed', 'Worker'],
    benefit: 'Builds a pension safety net with regular contributions.',
  },
  {
    name: 'Mukhyamantri Kanya Vivah Yojana',
    description: 'Support for eligible women beneficiaries in selected states.',
    minAge: 18,
    maxIncome: 300000,
    categories: ['Any'],
    states: ['Bihar', 'Madhya Pradesh'],
    occupations: ['Any'],
    benefit: 'Provides financial support for eligible marriage assistance cases.',
  },
  {
    name: 'PM Ujjwala Yojana',
    description: 'LPG connection support for eligible low-income households.',
    minAge: 18,
    maxIncome: 300000,
    categories: ['SC', 'ST', 'OBC', 'EWS'],
    states: ['Any'],
    occupations: ['Homemaker', 'Worker', 'Self-Employed'],
    benefit: 'Helps households move to cleaner cooking fuel.',
  },
  {
    name: 'National Apprenticeship Promotion Scheme',
    description: 'Encourages apprenticeship opportunities for youth and fresh workers.',
    minAge: 14,
    maxAge: 35,
    maxIncome: 600000,
    categories: ['Any'],
    states: ['Any'],
    occupations: ['Student', 'Worker'],
    benefit: 'Supports skilling and on-the-job training opportunities.',
  },
  {
    name: 'Stand-Up India',
    description: 'Loan support for entrepreneurs from underrepresented groups.',
    minAge: 18,
    maxIncome: 1000000,
    categories: ['SC', 'ST', 'Women'],
    states: ['Any'],
    occupations: ['Self-Employed'],
    benefit: 'Offers bank loan support for starting new enterprises.',
  },
]

const initialForm = {
  age: '',
  annualFamilyIncome: '',
  category: '',
  state: '',
  occupation: '',
}

const categories = ['General', 'OBC', 'SC', 'ST', 'EWS', 'Women']

const states = [
  'Andhra Pradesh',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Madhya Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
]

const occupations = ['Farmer', 'Homemaker', 'Self-Employed', 'Student', 'Worker']

function matchesRule(value, allowedValues) {
  if (!value) {
    return true
  }

  return allowedValues.includes('Any') || allowedValues.includes(value)
}

function formatEligibility(scheme) {
  const parts = []

  if (scheme.minAge !== undefined || scheme.maxAge !== undefined) {
    if (scheme.minAge !== undefined && scheme.maxAge !== undefined) {
      parts.push(`Age ${scheme.minAge}-${scheme.maxAge}`)
    } else if (scheme.minAge !== undefined) {
      parts.push(`Age ${scheme.minAge}+`)
    }
  }

  if (scheme.maxIncome !== undefined) {
    parts.push(`Income up to Rs. ${scheme.maxIncome.toLocaleString('en-IN')}`)
  }

  if (!scheme.categories.includes('Any')) {
    parts.push(scheme.categories.join(', '))
  }

  if (!scheme.states.includes('Any')) {
    parts.push(scheme.states.join(', '))
  }

  if (!scheme.occupations.includes('Any')) {
    parts.push(scheme.occupations.join(', '))
  }

  return parts
}

function SchemeFinder() {
  const [form, setForm] = useState(initialForm)
  const [submittedForm, setSubmittedForm] = useState(initialForm)
  const [hasSearched, setHasSearched] = useState(false)

  const matchedSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const age = Number(submittedForm.age)
      const annualFamilyIncome = Number(submittedForm.annualFamilyIncome)

      const ageMatches =
        !submittedForm.age ||
        ((scheme.minAge === undefined || age >= scheme.minAge) &&
          (scheme.maxAge === undefined || age <= scheme.maxAge))

      const incomeMatches =
        !submittedForm.annualFamilyIncome ||
        (scheme.maxIncome === undefined || annualFamilyIncome <= scheme.maxIncome)

      return (
        ageMatches &&
        incomeMatches &&
        matchesRule(submittedForm.category, scheme.categories) &&
        matchesRule(submittedForm.state, scheme.states) &&
        matchesRule(submittedForm.occupation, scheme.occupations)
      )
    })
  }, [submittedForm])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmittedForm(form)
    setHasSearched(true)
  }

  function handleReset() {
    setForm(initialForm)
    setSubmittedForm(initialForm)
    setHasSearched(false)
  }

  return (
    <section className="section scheme-section">
      <div className="section-heading">
        <p className="eyebrow">Scheme Finder</p>
        <h2>Find schemes that fit your profile</h2>
        <p>
          Use age, state, category, annual family income, and occupation to
          check which schemes may suit you.
        </p>
      </div>

      <div className="scheme-layout">
        <form className="scheme-form" onSubmit={handleSubmit}>
          <div className="form-intro">
            <p className="card-kicker">Finder input</p>
            <h3>Enter your details</h3>
            <p>We will match the details below against the available scheme rules.</p>
          </div>

          <label className="field">
            <span>Age</span>
            <input
              min="0"
              name="age"
              onChange={handleChange}
              placeholder="Enter age"
              type="number"
              value={form.age}
            />
          </label>

          <label className="field">
            <span>Annual Family Income</span>
            <input
              min="0"
              name="annualFamilyIncome"
              onChange={handleChange}
              placeholder="Enter annual family income"
              type="number"
              value={form.annualFamilyIncome}
            />
          </label>

          <label className="field">
            <span>Category</span>
            <select name="category" onChange={handleChange} value={form.category}>
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>State</span>
            <select name="state" onChange={handleChange} value={form.state}>
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Occupation</span>
            <select name="occupation" onChange={handleChange} value={form.occupation}>
              <option value="">Select occupation</option>
              {occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
            </select>
          </label>

          <div className="form-actions">
            <button className="button button-primary" type="submit">
              Find schemes
            </button>
            <button className="button button-secondary" onClick={handleReset} type="button">
              Reset
            </button>
          </div>
        </form>

        <div className="scheme-results">
          <div className="results-header">
            <p className="card-kicker">Search results</p>
            <h3>Suitable schemes</h3>
            <p>{hasSearched ? `${matchedSchemes.length} match found` : 'Search to view results'}</p>
          </div>

          {hasSearched ? (
            matchedSchemes.length > 0 ? (
            <div className="results-grid">
              {matchedSchemes.map((scheme) => (
                <article className="scheme-card" key={scheme.name}>
                  <h3>{scheme.name}</h3>
                  <p>{scheme.description}</p>
                  <p className="scheme-benefit">{scheme.benefit}</p>
                  <div className="scheme-meta">
                    {formatEligibility(scheme).map((item) => (
                      <span className="scheme-chip" key={`${scheme.name}-${item}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            ) : (
            <div className="scheme-card empty-state">
              <h3>No schemes matched</h3>
              <p>Try adjusting the eligibility details to widen the search.</p>
            </div>
            )
          ) : (
            <div className="scheme-card prompt-state">
              <h3>Ready to check eligibility</h3>
              <p>
                Fill in the details on the left and click <strong>Find schemes</strong> to
                see matches based on age, state, category, annual family income,
                and occupation.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default SchemeFinder

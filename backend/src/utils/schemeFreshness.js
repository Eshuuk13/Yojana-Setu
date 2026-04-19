export function isStale(lastUpdated) {
  const now = new Date()
  const diffDays = (now - new Date(lastUpdated)) / (1000 * 60 * 60 * 24)

  return diffDays > 7
}

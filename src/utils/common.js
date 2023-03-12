export const sample = (collection) => {
  return [...collection].sort(() => Math.random() - Math.random()).slice(0, 1)
}

export const sampleSize = (collection, n) => {
  return [...collection].sort(() => Math.random() - Math.random()).slice(0, n)
}

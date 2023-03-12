export const sample = (array) => {
  const length = array == null ? 0 : array.length
  return length ? array[Math.floor(Math.random() * length)] : undefined
}

export const sampleSize = (array, n) => {
  return [...array].sort(() => Math.random() - Math.random()).slice(0, n)
}

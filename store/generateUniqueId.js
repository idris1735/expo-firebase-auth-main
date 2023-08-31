function generateUniqueId() {
  const randomPart = Math.random().toString(36).substring(2, 8) // Adjust the length as needed
  const timestampPart = Date.now().toString(36).substring(2, 9) // Adjust the length as needed
  return randomPart + timestampPart
}

export { generateUniqueId }

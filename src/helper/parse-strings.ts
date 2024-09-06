export const isSimilar = (a: string | null | undefined, b: string) => {
  if (!a) return false
  return a.toLowerCase().includes(b.toLowerCase())
}

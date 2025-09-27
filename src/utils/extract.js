export default function extract(text) {
  const regex = /((\d+(\.\d+)?\s*)(plus|minus|\+|\-|times|x|multiplied by|\*|divided by|\/|over)\s*)+\d+(\.\d+)?/i
  const match = text.match(regex)
  return match ? match[0] : null
}

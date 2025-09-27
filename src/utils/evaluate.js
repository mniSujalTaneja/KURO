// utils/evaluate.js
import { evaluate as mathEvaluate } from 'mathjs'

export default function evaluate(expr) {
  try {
    // Normalize keywords
    expr = expr.toLowerCase()
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/times|x|multiplied by/g, "*")
      .replace(/divided by|over/g, "/")
      .replace(/\s+/g, "")

    return mathEvaluate(expr)
  } catch {
    return "Error evaluating"
  }
}

export function constrain(x: number, xmin: number, xmax: number): number {
  return Math.max(Math.min(x, xmax), xmin)
}

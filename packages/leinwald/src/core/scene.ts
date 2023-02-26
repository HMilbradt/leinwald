import { LeinwaldElement, LeinwaldScene } from "../types"

export const createScene = (): LeinwaldScene => {
  const elements: LeinwaldElement[] = []
  const selectedElements: LeinwaldElement[] = []
  const hoveredElements: LeinwaldElement[] = []

  return {
    elements,
    selectedElements,
    hoveredElements,
  }
}
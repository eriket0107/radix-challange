import { Sensor } from 'database/entities/Sensor'

export const getMeanValue = (periodMean: Sensor[]): { value: number } => {
  if (periodMean.length === 0) return { value: 0 }

  const sum = periodMean.reduce(
    (sum, item) => (!item.value || isNaN(item.value) ? sum : sum + item.value),
    0,
  )

  return {
    value: sum / periodMean.length,
  }
}

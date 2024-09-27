import dayjs from 'dayjs'

import { SensorRepository } from '@/repositories/sensor-repository'
import { getMeanValue } from '@/utils/getMeanValue'

enum DaysBehindCurrentDate {
  oneDay = '24h',
  twoDays = '48h',
  sevenDays = '1 Semana',
  thirtyDays = '1 Mês',
}

const periodsToCompare = {
  today: dayjs().format('YYYY-MM-DD'),
  oneDay: dayjs().subtract(1, 'days').format('YYYY-MM-DD'),
  twoDays: dayjs().subtract(2, 'days').format('YYYY-MM-DD'),
  sevenDays: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
  thirtyDays: dayjs().subtract(30, 'days').format('YYYY-MM-DD'),
} as const

type GetMeanByPeriodResponse = {
  period: DaysBehindCurrentDate
  mean: string
}

type PeriodsToCompare = 'oneDay' | 'twoDays' | 'sevenDays' | 'thirtyDays'

const meanByPeriod: GetMeanByPeriodResponse[] = []

export class GetMeanByPeriodUseCase {
  constructor(private sensorRepository: SensorRepository) {}

  async execute(): Promise<GetMeanByPeriodResponse[]> {
    const days = Object.keys(periodsToCompare).filter((key) => key !== 'today')

    for (const day of days as PeriodsToCompare[]) {
      const periodMean = await this.sensorRepository.period({
        startDate: periodsToCompare.today,
        endDate: periodsToCompare[day],
      })
      const meanValue = getMeanValue(periodMean)

      meanByPeriod.push({
        period: DaysBehindCurrentDate[day],
        mean: Number(meanValue.value).toFixed(1),
      })
    }

    return meanByPeriod
  }
}

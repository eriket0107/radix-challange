import { TypeOrmCsvRepository } from '@/repositories/typeorm/typeorm-csv-repository'
import { InputCsvUseCase } from '@/use-cases/input-csv-use-case'

export const makeInputCsv = () => {
  const csvRepository = new TypeOrmCsvRepository()

  const csvInputUseCase = new InputCsvUseCase(csvRepository)

  return csvInputUseCase
}

import { TypeOrmCsvRepository } from '@/repositories/typeorm/typeorm-csv-repository'
import { ListAllCsvFilesUseCase } from '@/use-cases/csv/list-all-csv-files-use-case'

export const makeListCsv = () => {
  const repository = new TypeOrmCsvRepository()
  const listCsvUseCase = new ListAllCsvFilesUseCase(repository)

  return listCsvUseCase
}

import { CsvRepository } from '@/repositories/csv-repository'

import { InputCsvError } from '../errors/input-csv-error'

type CsvDataRequest = {
  path: string
  id: string
  name: string
  fileName: string
}

export class InputCsvUseCase {
  constructor(private csvRepository: CsvRepository) {}

  async execute(csvDataRequest: CsvDataRequest) {
    if (!csvDataRequest) throw new InputCsvError()

    const csvFile = await this.csvRepository.saveFile(csvDataRequest)

    return {
      csvFile,
    }
  }
}

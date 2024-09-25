import { CsvRepository } from '@/repositories/csv-repository'

type CsvDataRequest = {
  path: string
  id: string
  name: string
}

export class InputCsvUseCase {
  constructor(private csvRepository: CsvRepository) {}

  async execute(csvDataRequest: CsvDataRequest) {
    const csvFile = await this.csvRepository.saveFile(csvDataRequest)

    return {
      csvFile,
    }
  }
}

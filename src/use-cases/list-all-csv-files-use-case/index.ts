import { CsvRepository } from '@/repositories/csv-repository'

export class ListAllCsvFilesUseCase {
  constructor(private csvRepository: CsvRepository) {}

  async execute() {
    const csvFiles = await this.csvRepository.listFiles()

    return {
      csvFiles,
    }
  }
}

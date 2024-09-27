import { dataSource } from 'database/data-source'
import { Csv } from 'database/entities/Csv'
import { Repository } from 'typeorm'

import { CsvData, CsvRepository } from '../csv-repository'

export class TypeOrmCsvRepository implements CsvRepository {
  private repository: Repository<Csv> = dataSource.getRepository(Csv)
  async saveFile(csvFile: CsvData): Promise<Csv> {
    const data = await this.repository.save(csvFile)

    return data
  }

  async listFiles(): Promise<Csv[]> {
    const data = this.repository.find()

    return data
  }
}

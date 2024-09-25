import { Csv } from 'database/entities/Csv'

export type CsvData = {
  path: string
  id: string
  name: string
}

export interface CsvRepository {
  saveFile(csvFile: CsvData): Promise<Csv>
}

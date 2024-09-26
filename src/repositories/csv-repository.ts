import { Csv } from 'database/entities/Csv'

export type CsvData = {
  path: string
  id: string
  fileName: string
}

export interface CsvRepository {
  saveFile(csvFile: CsvData): Promise<Csv>
  listFiles(): Promise<Csv[]>
}

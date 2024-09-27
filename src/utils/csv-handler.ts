import { randomUUID } from 'node:crypto'
import fsStream from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'

import { SavedMultipartFile } from '@fastify/multipart'
import { parse as csvParse } from 'csv-parse'
import { Sensor } from 'database/entities/Sensor'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

type File = SavedMultipartFile

export class FileHandler {
  async saveFile({ file }: { file: File }) {
    const fileId = randomUUID()
    const uniqueName =
      `${dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')}_${fileId}`.split('.')[0]

    const csvId = uniqueName.includes(fileId) && uniqueName.split('_')[1]

    const csvPath = path.join('src/uploads', `${uniqueName}.csv`)

    const dirPath = path.dirname(csvPath)
    await fs.mkdir(dirPath, { recursive: true })

    await fs.rename(file.filepath, csvPath)

    try {
      await fs.writeFile(file.filepath, csvPath)
      console.log(`File moved and resized successfully to ${csvPath}`)
      return {
        csvPath,
        csvId,
        type: 'csv',
        uniqueName,
        fileSizeInMB: (await fs.stat(csvPath)).size / 1024 / 1024,
      }
    } catch (error) {
      console.error(`Error processing file: ${(error as Error).message}`)
    }
  }

  async readFile(path: string): Promise<Buffer | undefined> {
    try {
      const data = await fs.readFile(path)
      return data
    } catch (error) {
      console.error('Error reading file:', error)
      throw error
    }
  }

  async parseFile({ path }: { path: string }) {
    const csvRows: Sensor[] = []

    return new Promise((resolve, reject) =>
      fsStream
        .createReadStream(path)
        .pipe(
          csvParse({
            columns: true,
            skip_empty_lines: true,
          }),
        )
        .on('data', (data: any) => {
          csvRows.push(data)
        })
        .on('end', () => {
          resolve(csvRows)
        })
        .on('error', (error: Error) => {
          reject(error)
        }),
    )
  }
}

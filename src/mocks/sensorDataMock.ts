import dayjs from 'dayjs'

export const sensorDataMock = (i: number = 1) => ({
  equipmentId: `EQ-${Math.floor(10000 + Math.random() * 90000)}`, // Random equipmentId
  value: Number((Math.random() * 100).toFixed(2)), // Random value between 0 and 100
  timestamp: dayjs().subtract(i, 'days').format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
})

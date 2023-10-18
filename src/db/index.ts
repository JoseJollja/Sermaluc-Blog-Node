import mongoose from 'mongoose'
import logger from '@src/utils/logger'
import config from '@src/config'

const { host, port, name, password, username } = config.db

export default class Database {
  client: typeof mongoose
  uri = `mongodb://${username}:${password}@${host}:${port}/${name}`

  events() {
    process
      .on('SIGTERM', () => {
        this.client
          ?.disconnect()
          .then(() => {
            console.log('\nDisconnected from db')
          })
          .catch(() => {
            console.log('\nError disconnecting from db')
          })
          .finally(() => {
            process.exit(1)
          })
      })
      .on('SIGINT', () => {
        this.client
          ?.disconnect()
          .then(() => {
            console.log('\nDisconnected from db')
          })
          .catch(() => {
            console.log('\nError disconnecting from db')
          })
          .finally(() => {
            process.exit(1)
          })
      })
  }

  async connect() {
    this.events()

    try {
      this.client = await mongoose.connect(this.uri)

      logger.info('Connected to the DB.')
    } catch (error) {
      console.error(error)
      logger.error('Fail connection to the DB.')
    }
  }
}

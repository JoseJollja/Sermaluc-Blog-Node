import cors from 'cors'
import express, { type Express } from 'express'

import Database from './db'
import config from './config'
import logger from './utils/logger'
import AppError from './utils/app-error'
import rootRouter from './router/root-router'
import path from 'path'

class Server {
  app: Express
  db: Database
  port = config.server.port

  constructor() {
    this.app = express()
    this.db = new Database()
  }

  middlewares() {
    this.app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))
    this.app.use(express.json())
    this.app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))
  }

  async start() {
    try {
      // DB connection
      await this.db.connect()

      // Middlewares
      this.middlewares()

      // Root router
      this.app.use('/api', rootRouter)

      // Start Server
      await new Promise((resolve) => {
        this.app.listen(this.port, () => {
          resolve(true)
        })
      })

      logger.info(`Server started on http://localhost:${this.port}`)
    } catch (e: unknown) {
      const error = e as Error

      if (error instanceof AppError) {
        logger.error(`[SERVER]: ${error.message}`)
      }
    }
  }
}

export default Server

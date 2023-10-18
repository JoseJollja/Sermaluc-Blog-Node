import 'dotenv/config'
import { z } from 'zod'

const server = z.object({
  PORT: z.string(),
  MONGO_DB_PORT: z.string(),
  MONGO_DB_HOST: z.string(),
  MONGO_DB_NAME: z.string(),
  MONGO_DB_USERNAME: z.string(),
  MONGO_DB_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production'])
})

const processEnv: Record<keyof z.infer<typeof server>, string | undefined> = {
  PORT: process.env.PORT,
  MONGO_DB_PORT: process.env.MONGO_DB_PORT,
  MONGO_DB_HOST: process.env.MONGO_DB_HOST,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME,
  MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV
}

const parsed = server.safeParse(processEnv)

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

const env = process.env as z.infer<typeof server>

export default {
  mode: env.NODE_ENV,
  session: {
    secret: env.JWT_SECRET
  },
  server: {
    port: env.PORT
  },
  db: {
    port: env.MONGO_DB_PORT,
    host: env.MONGO_DB_HOST,
    name: env.MONGO_DB_NAME,
    password: env.MONGO_DB_PASSWORD,
    username: env.MONGO_DB_USERNAME
  }
}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'

async function bootstrap() {
  const envConfRes = config({ path: '../.env' })
  if (envConfRes.error) throw envConfRes.error
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  await app.listen(process.env.SERVER_PORT)
}
bootstrap()

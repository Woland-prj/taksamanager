import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from 'dotenv'
import { VersioningType } from '@nestjs/common'

async function bootstrap() {
  const envConfRes = config({ path: '../.env' })
  if (envConfRes.error) throw envConfRes.error
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  app.enableVersioning({
    type: VersioningType.URI
  })
  await app.listen(process.env.SERVER_PORT)
}
bootstrap()

import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	// const envConfRes = config({ path: '.env' })
	// if (envConfRes.error) throw envConfRes.error

	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')
	app.enableVersioning({
		type: VersioningType.URI
	})
	app.useGlobalPipes(new ValidationPipe())
	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders:
			'Origin, Content-Type, Accept, Authorization, X-Requested-With',
		credentials: true
	})

	const docConfig = new DocumentBuilder()
		.setTitle('Taksamanager')
		.setDescription('Taksamanager API description')
		.setVersion('1.0')
		.addTag('CRUD users operations')
		.addTag('Authentication')
		.addTag('CRUD tasks operation (in development)')
		.addTag('Test endpoints')
		.addBearerAuth()
		.addCookieAuth('refresh_jwt')
		.build()
	const document = SwaggerModule.createDocument(app, docConfig)
	SwaggerModule.setup('api/v1', app, document)

	await app.listen(process.env.SERVER_PORT)
}
bootstrap()

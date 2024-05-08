import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { API_VERSION_PREFIX } from './common/constants/request-routes'

async function run() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException({
          message: Object.values(validationErrors[0].constraints).join(', ').split(', ').at(0),
          error: 'Bad Request',
          statusCode: 400,
        })
      },
    }),
  )
  app.setGlobalPrefix(API_VERSION_PREFIX)
  await app.listen(3000)
}

run()

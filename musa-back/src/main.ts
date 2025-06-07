import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS para permitir peticiones desde Angular
  app.enableCors({
    origin: ['http://localhost:4200', 'https://musa-frontend.onrender.com'],
    credentials: true,
  });


  // ✅ Activar validación global (opcional, pero recomendado si usás DTOs)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

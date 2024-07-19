import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.util';
import { linkToDatabase } from './utils/db.util';
import * as session from 'express-session';
import * as passport from 'passport';
import { config } from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
config();

let env = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});
  app.setGlobalPrefix('api'); // /api/upload/undef-fejifd.png
  app.use(
    session({
      secret: env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.use(passport.initialize());
  app.use(passport.session());
  linkToDatabase();
  if (env.MODE == "DEV") {
		try {
			setupSwagger(app);
			console.log("Swagger is enabled");
		} catch (e) {
			console.error(e);
		}
	}
  await app.listen(env.PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger.util';
import { linkToDatabase } from './utils/db.util';
import * as session from 'express-session';
import * as passport from 'passport';
import { config } from 'dotenv';
config();

let env = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

import express, { Express } from 'express';
import passport from 'passport';
import { Environment } from './shared/environment/environment';
import { UserRouter } from './user/user-router';
import bodyParser from 'body-parser';
import { JwtAuthStrategy } from './auth/jwt-auth-strategy';

Environment.init(); // needed to set basic default values

const PORT: number = Environment.processPort();
const app: Express = express();

const jwtStrategy: JwtAuthStrategy = new JwtAuthStrategy(
  Environment.jwtSecret(),
);
passport.use(jwtStrategy.get());
passport.initialize();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/user', new UserRouter().get());

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

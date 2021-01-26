// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv';

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import PokemonRoutes from './Pokemons';
import BattleRoutes from './Battle';
import swaggerFile from './swagger_output.json';

const routes = Router();

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

routes.use(PokemonRoutes);
routes.use(BattleRoutes);

export default routes;

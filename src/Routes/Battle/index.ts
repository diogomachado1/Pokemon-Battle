import { Router } from 'express';
import PokemonRepository from '../../Repositories/db/Pokemon/PokemonRepository';
import BattleService from '../../Services/Battle/BattleService';
import PokemonService from '../../Services/Pokemon/PokemonService';

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const battleService = new BattleService(pokemonService);
const routes = Router();

routes.post('/batalhar/:pokemonAId/:pokemonBId', async (req, res) => {
  // #swagger.tags = ['Batalha']
  // #swagger.description = 'Batalha entre pokemons'
  // #swagger.parameters['pokemonAId'] = { description: 'ID do pokemon A.' }
  // #swagger.parameters['pokemonBId'] = { description: 'ID do pokemon B.' }
  const { pokemonAId, pokemonBId } = req.params;
  const response = await battleService.battlePokemon(
    parseInt(pokemonAId, 10),
    parseInt(pokemonBId, 10)
  );
  /* #swagger.responses[200] = { 
    schema: { $ref: "#/definitions/BattleResult" },
    description: 'Pokemon .' 
  } */
  /* #swagger.responses[404] = { 
    description: 'Pokemon não encontrado.'
  } */
  return res.status(200).json(response);
});

export default routes;

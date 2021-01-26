import { Router } from 'express';
import PokemonRepository from '../../Repositories/db/Pokemon/PokemonRepository';
import PokemonService from '../../Services/Pokemon/PokemonService';

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);
const routes = Router();

routes.post('/pokemons', async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Criar um pokemon'
  /* #swagger.parameters['obj'] = {  
           in: 'body',
           description: 'Dados do pokemon',
           type: 'object',
           schema: { $ref: "#/definitions/postPokemon" }
    } */
  const response = await pokemonService.storePokemon(req.body);
  /* #swagger.responses[200] = { 
               description: 'Pokemon Criado.',
                schema: { $ref: "#/definitions/Pokemon" },
        } */
  /* #swagger.responses[400] = { 
               description: 'Erro na criação do pokemon.'
        } */
  return res.status(200).json(response);
});

routes.put('/pokemons/:id', async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Alterar pokemon pelo id'
  // #swagger.parameters['id'] = { description: 'ID do pokemon.' }
  /* #swagger.parameters['obj'] = {  
           in: 'body',
           description: 'Dados do pokemon',
           type: 'object',
           schema: { $ref: "#/definitions/updatePokemon" }
    } */
  const response = await pokemonService.updatePokemon(
    parseInt(req.params.id, 10),
    req.body
  );
  /* #swagger.responses[204] = { 
          description: 'Pokemon alterado.' 
  } */
  /* #swagger.responses[400] = { 
          description: 'Erro na alteração do pokemon.'
  } */
  /* #swagger.responses[404] = { 
          description: 'Pokemon não encontrado.'
  } */
  return res.status(204).json(response);
});

routes.delete('/pokemons/:id', async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Deletar pokemon pelo id'
  // #swagger.parameters['id'] = { description: 'ID do pokemon.' }
  const response = await pokemonService.deletePokemon(
    parseInt(req.params.id, 10)
  );
  /* #swagger.responses[204] = { 
    description: 'Pokemon deletado.' 
  } */
  /* #swagger.responses[404] = { 
    description: 'Pokemon não encontrado.'
  } */
  return res.status(204).json(response);
});

routes.get('/pokemons/:id', async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Buscar pokemon pelo id'
  // #swagger.parameters['id'] = { description: 'ID do pokemon.' }
  const response = await pokemonService.getPokemon(parseInt(req.params.id, 10));
  /* #swagger.responses[200] = { 
    schema: { $ref: "#/definitions/Pokemon" },
    description: 'Pokemon encontrado.' 
  } */
  /* #swagger.responses[404] = { 
    description: 'Pokemon não encontrado.'
  } */
  return res.status(200).json(response);
});

routes.get('/pokemons', async (req, res) => {
  // #swagger.tags = ['Pokemon']
  // #swagger.description = 'Buscar todos os pokemons'
  const response = await pokemonService.getAllPokemon();

  /* #swagger.responses[200] = { 
    schema: { $ref: "#/definitions/Pokemons" },
    description: 'Pokemons.' 
  } */
  return res.status(200).json(response);
});

export default routes;

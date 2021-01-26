// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerAutogen = require('swagger-autogen')();

console.log(process.env.API_URL);
const doc = {
  info: {
    title: 'Pokemon-battle',
    description: 'Description',
  },
  host: process.env.API_URL || 'localhost:3333',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Pokemons: [
      {
        id: 1,
        treinador: 'Diogo',
        tipo: 'mewtwo',
        nivel: 1,
      },
    ],
    Pokemon: {
      id: 1,
      treinador: 'Diogo',
      tipo: 'mewtwo',
      nivel: 1,
    },
    postPokemon: {
      $treinador: 'Diogo',
      $tipo: 'mewtwo',
    },
    updatePokemon: {
      $treinador: 'Diogo',
    },
    BattleResult: {
      vencedor: { id: 1, nivel: 2, tipo: 'mewtwo', treinador: 'Diogo' },
      perdedor: { id: 2, nivel: 0, tipo: 'mewtwo', treinador: 'Diogo' },
    },
  },
};

const outputFile = './src/Routes/swagger_output.json';
const endpointsFiles = ['./src/app', './src/server'];
// eslint-disable-next-line @typescript-eslint/no-var-requires
export default swaggerAutogen(outputFile, endpointsFiles, doc);

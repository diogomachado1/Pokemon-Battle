/* eslint-disable @typescript-eslint/no-empty-function */
import { IPokemonRepositoryService } from '../Interface/IPokemonService';

/* eslint-disable class-methods-use-this */
export default class PokemonServiceMock implements IPokemonRepositoryService {
  async getPokemon(id: number) {
    return {
      id,
      tipo: 'mewtwo',
      treinador: 'Diogo',
      nivel: 1,
    };
  }

  async updateWinnerPokemon(id: number) {
    return {
      id,
      tipo: 'mewtwo',
      treinador: 'Diogo',
      nivel: 2,
    };
  }

  async updateLoserPokemon(id: number) {
    return {
      id,
      tipo: 'mewtwo',
      treinador: 'Diogo',
      nivel: 0,
    };
  }
}

/* eslint-disable @typescript-eslint/no-empty-function */

import { IPokemonRepository } from '../Interface/IPokemonRepository';

/* eslint-disable class-methods-use-this */
export default class PokemonRepositoryMock implements IPokemonRepository {
  async createPokemon({
    tipo,
    treinador,
  }: {
    tipo: string;
    treinador: string;
  }) {
    return {
      id: 1,
      tipo,
      treinador,
      nivel: 1,
    };
  }

  async findOnePokemon(id: number) {
    if (id === 10) {
      return undefined;
    }
    return {
      id,
      tipo: 'mewtwo',
      treinador: 'Diogo',
      nivel: 1,
    };
  }

  async findAllPokemon() {
    return [
      {
        id: 1,
        tipo: 'mewtwo',
        treinador: 'Diogo',
        nivel: 1,
      },
      {
        id: 2,
        tipo: 'pikachu',
        treinador: 'Diogo',
        nivel: 2,
      },
    ];
  }

  async updatePokemon(
    id: number,
    data: {
      treinador: string;
    }
  ) {}

  async updatePokemonLvUp(id: number) {}

  async updatePokemonLvDown(id: number) {}

  async deletePokemon(id: number) {}
}

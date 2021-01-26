import { IPokemon } from './IPokemon';

export interface IPokemonRepository {
  createPokemon: (payload: {
    tipo: string;
    treinador: string;
  }) => Promise<IPokemon>;

  findOnePokemon: (id: number) => Promise<IPokemon | undefined>;
  findAllPokemon: () => Promise<IPokemon[]>;
  updatePokemon: (
    id: number,
    data: {
      treinador: string;
    }
  ) => Promise<void>;

  updatePokemonLvUp: (id: number) => Promise<void>;
  updatePokemonLvDown: (id: number) => Promise<void>;

  deletePokemon: (id: number) => Promise<void>;
}

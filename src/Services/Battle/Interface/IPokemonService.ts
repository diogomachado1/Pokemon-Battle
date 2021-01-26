import { IPokemon } from '../../Pokemon/Interface/IPokemon';

export interface IPokemonRepositoryService {
  getPokemon(id: number): Promise<IPokemon>;
  updateLoserPokemon(id: number): Promise<IPokemon>;
  updateWinnerPokemon(id: number): Promise<IPokemon>;
}

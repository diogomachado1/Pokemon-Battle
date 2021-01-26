import PokemonValidator from './PokemonValidator';
import { IPokemonRepository } from './Interface/IPokemonRepository';
import CustomError from '../../Libs/CustomError';
import { IPokemonRepositoryService } from '../Battle/Interface/IPokemonService';

export default class PokemonService implements IPokemonRepositoryService {
  repository: IPokemonRepository;

  validator: PokemonValidator;

  constructor(repository: IPokemonRepository) {
    this.repository = repository;
    this.validator = new PokemonValidator();
  }

  async getAllPokemon() {
    const pokemons = await this.repository.findAllPokemon();
    return pokemons;
  }

  async getPokemon(id: number) {
    const { id: validetedId } = await this.validator.validatevalidId({ id });
    const pokemon = await this.repository.findOnePokemon(validetedId);
    if (!pokemon) throw new CustomError('Pokemon not found', 404);
    return pokemon;
  }

  async storePokemon(data: { tipo: string; treinador: string }) {
    const validated = await this.validator.validateStorePokemonSchema(data);
    return this.repository.createPokemon(validated);
  }

  async updatePokemon(id: number, data: { treinador: string }) {
    const validated = await this.validator.validateUpdatePokemonSchema(data);
    await this.getPokemon(id);
    return this.repository.updatePokemon(id, validated);
  }

  async deletePokemon(id: number) {
    await this.getPokemon(id);
    return this.repository.deletePokemon(id);
  }

  async updateWinnerPokemon(id: number) {
    const { id: validetedId } = await this.validator.validatevalidId({ id });
    await this.repository.updatePokemonLvUp(validetedId);
    return this.getPokemon(validetedId);
  }

  async updateLoserPokemon(id: number) {
    const { id: validetedId } = await this.validator.validatevalidId({ id });
    await this.repository.updatePokemonLvDown(validetedId);
    const pokemon = await this.getPokemon(validetedId);
    if (pokemon.nivel <= 0) await this.repository.deletePokemon(validetedId);
    return pokemon;
  }
}

import { IPokemonRepositoryService } from './Interface/IPokemonService';

/* eslint-disable class-methods-use-this */
export default class BattleService {
  pokemonService: IPokemonRepositoryService;

  constructor(pokemonService: IPokemonRepositoryService) {
    this.pokemonService = pokemonService;
  }

  getVictoryTax(pokemonALv: number, pokemonBLv: number) {
    if (pokemonALv === pokemonBLv) return 50;
    if (pokemonALv > pokemonBLv) return 66.67;
    return 33.33;
  }

  async battlePokemon(pokemonAId: number, pokemonBId: number) {
    const [pokemonA, pokemonB] = await Promise.all([
      this.pokemonService.getPokemon(pokemonAId),
      this.pokemonService.getPokemon(pokemonBId),
    ]);

    const victoryTaxPokemonA = this.getVictoryTax(
      pokemonA.nivel,
      pokemonA.nivel
    );

    const result =
      Math.random() * 100 <= victoryTaxPokemonA
        ? { winner: pokemonA, loser: pokemonB }
        : { winner: pokemonB, loser: pokemonA };

    const [winner, loser] = await Promise.all([
      this.pokemonService.updateWinnerPokemon(result.winner.id),
      this.pokemonService.updateLoserPokemon(result.loser.id),
    ]);

    return {
      vencedor: winner,
      perdedor: loser,
    };
  }
}

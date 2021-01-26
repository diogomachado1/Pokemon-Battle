import BattleService from './BattleService';
import PokemonServiceMock from './mocks/PokemonServiceMock';

const pokemonServiceMock = new PokemonServiceMock();

const battleService = new BattleService(pokemonServiceMock);

describe('BattleService Unit Test', () => {
  it('should be able to get a victory tax', async () => {
    expect(battleService.getVictoryTax(3, 3)).toBe(50);
    expect(battleService.getVictoryTax(3, 2)).toBe(66.67);
    expect(battleService.getVictoryTax(2, 3)).toBe(33.33);
  });

  it('should able to battle (A winner)', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);
    const getPokemonMockSpy = jest.spyOn(pokemonServiceMock, 'getPokemon');

    const updateWinnerPokemonSpy = jest.spyOn(
      pokemonServiceMock,
      'updateWinnerPokemon'
    );

    const updateLoserPokemonSpy = jest.spyOn(
      pokemonServiceMock,
      'updateLoserPokemon'
    );

    const response = await battleService.battlePokemon(1, 2);
    expect(getPokemonMockSpy).toHaveBeenCalledTimes(2);
    expect(getPokemonMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(getPokemonMockSpy).toHaveBeenNthCalledWith(2, 2);
    expect(updateWinnerPokemonSpy).toHaveBeenCalledTimes(1);
    expect(updateWinnerPokemonSpy).toHaveBeenNthCalledWith(1, 1);
    expect(updateLoserPokemonSpy).toHaveBeenCalledTimes(1);
    expect(updateLoserPokemonSpy).toHaveBeenNthCalledWith(1, 2);
    expect(response).toMatchObject({
      perdedor: { id: 2, nivel: 0, tipo: 'mewtwo', treinador: 'Diogo' },
      vencedor: { id: 1, nivel: 2, tipo: 'mewtwo', treinador: 'Diogo' },
    });
  });

  it('should able to battle (B Winner)', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);
    const getPokemonMockSpy = jest.spyOn(pokemonServiceMock, 'getPokemon');

    const updateWinnerPokemonSpy = jest.spyOn(
      pokemonServiceMock,
      'updateWinnerPokemon'
    );

    const updateLoserPokemonSpy = jest.spyOn(
      pokemonServiceMock,
      'updateLoserPokemon'
    );

    const response = await battleService.battlePokemon(1, 2);
    expect(getPokemonMockSpy).toHaveBeenCalledTimes(2);
    expect(getPokemonMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(getPokemonMockSpy).toHaveBeenNthCalledWith(2, 2);
    expect(updateWinnerPokemonSpy).toHaveBeenCalledTimes(1);
    expect(updateWinnerPokemonSpy).toHaveBeenNthCalledWith(1, 2);
    expect(updateLoserPokemonSpy).toHaveBeenCalledTimes(1);
    expect(updateLoserPokemonSpy).toHaveBeenNthCalledWith(1, 1);
    expect(response).toMatchObject({
      perdedor: { id: 1, nivel: 0, tipo: 'mewtwo', treinador: 'Diogo' },
      vencedor: { id: 2, nivel: 2, tipo: 'mewtwo', treinador: 'Diogo' },
    });
  });
});

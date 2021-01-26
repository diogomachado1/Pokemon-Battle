import PokemonService from './PokemonService';
import PokemonRepositoryMock from './mocks/PokemonRepositoryMock';
import { IPokemon } from './Interface/IPokemon';

const pokemonRepositoryMock = new PokemonRepositoryMock();
const pokemonService = new PokemonService(pokemonRepositoryMock);

describe('PokemonService Unit Test', () => {
  it('should store Pokemon', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'createPokemon'
    );
    const response = await pokemonService.storePokemon({
      tipo: 'mewtwo',
      treinador: 'Diogo',
    });
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenNthCalledWith(1, {
      tipo: 'mewtwo',
      treinador: 'Diogo',
    });
    expect(response).toMatchObject({
      id: 1,
      tipo: 'mewtwo',
      treinador: 'Diogo',
      nivel: 1,
    });
  });

  it('should get error when store Pokemon with wrong type', async () => {
    await expect(
      pokemonService.storePokemon({
        tipo: 'mew',
        treinador: 'Diogo',
      })
    ).rejects.toThrow(
      'tipo must be one of the following values: charizard, mewtwo, pikachu'
    );
  });

  it('should get a Pokemon by Id', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'findOnePokemon'
    );
    const response = await pokemonService.getPokemon(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(response).toMatchObject({
      id: 1,
      tipo: 'mewtwo',
      treinador: 'Diogo',
      nivel: 1,
    });
  });

  it('should get error when get a not found Pokemon', async () => {
    await expect(pokemonService.getPokemon(10)).rejects.toThrow(
      'Pokemon not found'
    );
  });

  it('should update a Pokemon by Id', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'updatePokemon'
    );
    const response = await pokemonService.updatePokemon(1, {
      treinador: 'Ash',
    });
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenNthCalledWith(1, 1, {
      treinador: 'Ash',
    });
    expect(response).toBe(undefined);
  });

  it('should delete a Pokemon by Id', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'deletePokemon'
    );
    const response = await pokemonService.deletePokemon(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledWith(1);
    expect(response).toBe(undefined);
  });

  it('should get All Pokemon', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'findAllPokemon'
    );
    const response = await pokemonService.getAllPokemon();
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(response).toMatchObject([
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
    ]);
  });

  it('should update a winner Pokemon by Id', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'updatePokemonLvUp'
    );
    jest.spyOn(pokemonService, 'getPokemon').mockReturnValueOnce(({
      id: 1,
      nivel: 2,
      tipo: 'mewtwo',
      treinador: 'Diogo',
    } as unknown) as Promise<IPokemon>);
    const response = await pokemonService.updateWinnerPokemon(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(response).toMatchObject({
      id: 1,
      nivel: 2,
      tipo: 'mewtwo',
      treinador: 'Diogo',
    });
  });

  it('should update a loser Pokemon by Id', async () => {
    const pokemonRepositoryMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'updatePokemonLvDown'
    );
    const response = await pokemonService.updateLoserPokemon(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenCalledTimes(1);
    expect(pokemonRepositoryMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(response).toMatchObject({
      id: 1,
      nivel: 1,
      tipo: 'mewtwo',
      treinador: 'Diogo',
    });
  });

  it('should delete a pokemon when updated lv is 0 or less', async () => {
    const updatePokemonLvDownMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'updatePokemonLvDown'
    );

    const deletePokemonMockSpy = jest.spyOn(
      pokemonRepositoryMock,
      'deletePokemon'
    );

    jest.spyOn(pokemonService, 'getPokemon').mockReturnValueOnce(({
      id: 1,
      nivel: 0,
      tipo: 'mewtwo',
      treinador: 'Diogo',
    } as unknown) as Promise<IPokemon>);
    const response = await pokemonService.updateLoserPokemon(1);
    expect(updatePokemonLvDownMockSpy).toHaveBeenCalledTimes(1);
    expect(updatePokemonLvDownMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(deletePokemonMockSpy).toHaveBeenCalledTimes(1);
    expect(deletePokemonMockSpy).toHaveBeenNthCalledWith(1, 1);
    expect(response).toMatchObject({
      id: 1,
      nivel: 0,
      tipo: 'mewtwo',
      treinador: 'Diogo',
    });
  });
});

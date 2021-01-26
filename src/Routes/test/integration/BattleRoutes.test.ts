// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import * as SequelizeRepository from '../../../Repositories/db';
import server from '../../../server';

const repository = SequelizeRepository;

describe('Battle integration', () => {
  beforeEach(async () => {
    await repository.reset();
  });
  afterAll(async () => {
    await repository.close();
  });

  it('should be able to pokemon A win', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.3);

    const pokemonA = await request(server.app).post(`/pokemons`).send({
      tipo: 'pikachu',
      treinador: 'Thiago',
    });
    const pokemonB = await request(server.app).post(`/pokemons`).send({
      tipo: 'charizard',
      treinador: 'Renato',
    });
    const response = await request(server.app).post(
      `/batalhar/${pokemonA.body.id}/${pokemonB.body.id}`
    );
    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      vencedor: {
        id: pokemonA.body.id,
        tipo: 'pikachu',
        treinador: 'Thiago',
        nivel: 2, // Subiu de nível
      },
      perdedor: {
        id: pokemonB.body.id,
        tipo: 'charizard',
        treinador: 'Renato',
        nivel: 0, // Morreu e foi deletado da tabela
      },
    });

    const pokemonUpdate = await request(server.app).get(
      `/pokemons/${pokemonB.body.id}`
    );

    expect(pokemonUpdate.status).toBe(404);
  });

  it('should be able to Pokemon B win', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.6);

    const pokemonA = await request(server.app).post(`/pokemons`).send({
      tipo: 'pikachu',
      treinador: 'Thiago',
    });
    const pokemonB = await request(server.app).post(`/pokemons`).send({
      tipo: 'charizard',
      treinador: 'Renato',
    });
    const response = await request(server.app).post(
      `/batalhar/${pokemonA.body.id}/${pokemonB.body.id}`
    );
    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      perdedor: {
        id: pokemonA.body.id,
        tipo: 'pikachu',
        treinador: 'Thiago',
        nivel: 0, // Subiu de nível
      },
      vencedor: {
        id: pokemonB.body.id,
        tipo: 'charizard',
        treinador: 'Renato',
        nivel: 2, // Morreu e foi deletado da tabela
      },
    });

    const pokemonUpdate = await request(server.app).get(
      `/pokemons/${pokemonA.body.id}`
    );

    expect(pokemonUpdate.status).toBe(404);
  });
});

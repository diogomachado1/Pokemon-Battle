// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import * as SequelizeRepository from '../../../Repositories/db';
import server from '../../../server';

const repository = SequelizeRepository;

describe('Pokemon integration', () => {
  beforeEach(async () => {
    await repository.reset();
  });
  afterAll(async () => {
    await repository.close();
  });

  it('should be able to create a Pokemon', async () => {
    const response = await request(server.app).post(`/pokemons`).send({
      tipo: 'pikachu',
      treinador: 'Thiago',
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: response.body.id,
      tipo: 'pikachu',
      treinador: 'Thiago',
      nivel: 1,
    });
  });

  it('should be able to update a Pokemon', async () => {
    const pokemon = await request(server.app).post(`/pokemons`).send({
      tipo: 'pikachu',
      treinador: 'Thiago',
    });
    const response = await request(server.app)
      .put(`/pokemons/${pokemon.body.id}`)
      .send({
        treinador: 'Thiago2',
      });
    expect(response.status).toBe(204);

    const pokemonUpdate = await request(server.app).get(
      `/pokemons/${pokemon.body.id}`
    );

    expect(pokemonUpdate.body.treinador).toBe('Thiago2');
  });

  it('should be able to delete a Pokemon', async () => {
    const pokemon = await request(server.app).post(`/pokemons`).send({
      tipo: 'pikachu',
      treinador: 'Thiago',
    });
    const response = await request(server.app).delete(
      `/pokemons/${pokemon.body.id}`
    );
    expect(response.status).toBe(204);

    const pokemonUpdate = await request(server.app).get(
      `/pokemons/${pokemon.body.id}`
    );

    expect(pokemonUpdate.status).toBe(404);
  });

  it('should be able to list all Pokemons', async () => {
    const {
      body: { id: pokemonAid },
    } = await request(server.app).post(`/pokemons`).send({
      tipo: 'pikachu',
      treinador: 'Thiago',
    });
    const {
      body: { id: pokemonBid },
    } = await request(server.app).post(`/pokemons`).send({
      tipo: 'charizard',
      treinador: 'Renato',
    });
    const response = await request(server.app).get(`/pokemons`);
    expect(response.status).toBe(200);

    expect(response.body).toMatchObject([
      {
        id: pokemonAid,
        tipo: 'pikachu',
        treinador: 'Thiago',
        nivel: 1,
      },
      {
        id: pokemonBid,
        tipo: 'charizard',
        treinador: 'Renato',
        nivel: 1,
      },
    ]);
  });
});

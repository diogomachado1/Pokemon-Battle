import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '..';
import { IPokemon } from '../../../Services/Pokemon/Interface/IPokemon';
import { IPokemonRepository } from '../../../Services/Pokemon/Interface/IPokemonRepository';

export const pokemonModel = sequelize.define(
  'Pokemon',
  {
    treinador: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Treinador',
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Tipo',
    },
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'Nivel',
    },
  },
  { timestamps: false }
);

export default class PokemonRepository implements IPokemonRepository {
  pokemonSequelize = pokemonModel;

  async findOnePokemon(id: number) {
    const pokemon = await this.pokemonSequelize.findByPk(id);
    return pokemon === null ? undefined : (pokemon.toJSON() as IPokemon);
  }

  async findAllPokemon() {
    const pokemon = await this.pokemonSequelize.findAll();
    return pokemon.map((item) => item.toJSON() as IPokemon);
  }

  async createPokemon(data: { tipo: string; treinador: string }) {
    return (
      await this.pokemonSequelize.create({ ...data, nivel: 1 })
    ).toJSON() as IPokemon;
  }

  async updatePokemon(id: number, data: { treinador: string }) {
    await this.pokemonSequelize.update(data, { where: { id } });
  }

  async updatePokemonLvUp(id: number) {
    await this.pokemonSequelize.increment('nivel', { where: { id } });
  }

  async updatePokemonLvDown(id: number) {
    await this.pokemonSequelize.increment('nivel', { where: { id }, by: -1 });
  }

  async deletePokemon(id: number) {
    await this.pokemonSequelize.destroy({ where: { id } });
  }
}

import * as Yup from 'yup';
import Validator from '../../Libs/Validator';

export default class PokemonValidator extends Validator {
  protected storePokemonSchema = Yup.object().shape({
    tipo: Yup.mixed().oneOf(['charizard', 'mewtwo', 'pikachu']).required(),
    treinador: Yup.string().trim().required(),
  });

  protected updatePokemonSchema = Yup.object().shape({
    treinador: Yup.string().trim().required(),
  });

  protected validId = Yup.object().shape({
    id: Yup.number().positive().required(),
  });

  async validateStorePokemonSchema(payload: any) {
    return this.validate(this.storePokemonSchema, payload);
  }

  async validatevalidId(payload: any) {
    return this.validate(this.validId, payload);
  }

  async validateUpdatePokemonSchema(payload: any) {
    return this.validate(this.updatePokemonSchema, payload);
  }
}

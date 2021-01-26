import { Options, Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize(config as Options);

export async function reset() {
  await sequelize.truncate();
}

export async function close() {
  await sequelize.close();
}

export default sequelize;

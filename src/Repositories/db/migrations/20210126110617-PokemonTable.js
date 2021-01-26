module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pokemons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Treinador: {
        type: 'nvarchar(50)',
        allowNull: false,
      },
      Tipo: {
        type: 'nvarchar(50)',
        allowNull: false,
      },
      Nivel: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Pokemons');
  },
};

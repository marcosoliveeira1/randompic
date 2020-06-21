module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('api_credentials', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      api_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      api_secret: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('api_credentials');
  },
};

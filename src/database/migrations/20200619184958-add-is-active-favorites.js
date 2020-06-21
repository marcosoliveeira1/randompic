module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('favorites', 'is_active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('favorites', 'is_active');
  },
};

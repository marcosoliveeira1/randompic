module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameColumn('favorites', 'url', 'image_url');
  },

  down: (queryInterface) => {
    return queryInterface.renameColumn('favorites', 'image_url', 'url');
  },
};

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'picfav',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};

import Sequelize from 'sequelize';
import ApiCredential from '../app/models/ApiCredential';
import Favorite from '../app/models/Favorite';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User, Favorite, ApiCredential];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();

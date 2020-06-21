import Sequelize, { Model } from 'sequelize';

class ApiCredential extends Model {
  static init(sequelize) {
    super.init(
      {
        api_name: Sequelize.STRING,
        api_secret: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default ApiCredential;

import ApiCredential from '../models/ApiCredential';

class GetApiCredentialsService {
  async get(api_name) {
    const credentials = await ApiCredential.findAll({
      where: { api_name },
    });
    return credentials;
  }
}
export default new GetApiCredentialsService();

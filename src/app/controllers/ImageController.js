// import axios from 'axios';
import api from '../../services/unsplash/api';
import FactoryApiCredentials from '../factory/FactoryApiCredentials';

class ImageController {
  async index(req, res) {
    try {
      const factoryCredentials = new FactoryApiCredentials('unsplash');
      const credentials = await factoryCredentials.get();

      const query = req.query.query || '';
      const page = req.query.page || 1;
      const endPoint = query ? `/search/photos/` : `photos/random`;
      const queryParams = {
        per_page: '30',
        order_by: 'popular',
        count: '30',
        query,
        page,
      };

      const credentialsSize = credentials.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < credentialsSize; i++) {
        const key = credentials[i].api_secret;

        api.setHeader('authorization', `Bearer ${key}'`);

        // eslint-disable-next-line no-await-in-loop
        const { data } = await api.get(endPoint, queryParams);
        if (data.errors && i + 1 === credentialsSize) {
          return res.json(data.errors);
        }
        if (!data.errors) {
          return res.json(data);
        }
      }
      return res.json({ errors: `Internal Error` });
    } catch (err) {
      return res.json({ errors: `Connection Error: ${err}` });
    }
  }
}

export default new ImageController();

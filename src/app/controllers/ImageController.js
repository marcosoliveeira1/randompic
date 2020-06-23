// import axios from 'axios';
import api from '../../services/unsplash/api';
import GetApiCredentialsService from '../services/GetApiCredentialsService';

class ImageController {
  async index(req, res) {
    try {
      const credentials = await GetApiCredentialsService.get('unsplash');

      const query = req.query.query || '';
      const page = req.query.page || 1;
      const endPoint = query ? `search/photos/` : `photos/random`;
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
          const byTerm = !!data.total_pages;

          const imagesTemp = byTerm ? data.results : data;

          const images = imagesTemp.map(
            ({ description, alt_description, urls: { raw: url } }) => {
              return { description, alt_description, url };
            }
          );

          return res.json({ page: data.total_pages || 1, images });
        }
      }
      return res.json({ errors: `Internal Error` });
    } catch (err) {
      return res.json({ errors: `Connection Error: ${err}` });
    }
  }
}

export default new ImageController();

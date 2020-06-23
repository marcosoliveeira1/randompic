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

      const per_page = 30;

      const queryParams = {
        per_page,
        order_by: 'popular',
        count: per_page,
        query,
        page,
      };

      const credentialsSize = credentials.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < credentialsSize; i++) {
        const key = credentials[i].api_secret;

        api.setHeader('authorization', `Bearer ${key}'`);

        // eslint-disable-next-line no-await-in-loop
        const response = await api.get(endPoint, queryParams);
        const { data } = response;
        console.log('log--->', response);
        if (data.errors && i + 1 === credentialsSize) {
          return res.json(data.errors);
        }
        if (!data.errors) {
          const byTerm = !!data.total_pages;

          const imagesTemp = byTerm ? data.results : data;

          const images = imagesTemp.map(
            ({
              id,
              description: name,
              alt_description: description,
              urls: { raw: image, small },
            }) => {
              const image_cropped = `${image}&ar=0.85:1&fit=crop`;
              return { id, name, description, image, small, image_cropped };
            }
          );
          res.set({
            total_results: data.total || 100,
            page,
            per_page,
          });

          // return res.json({ page: data.total_pages || 1, images });
          return res.json(images);
        }
      }

      return res.json({ errors: `Internal Error` });
    } catch (err) {
      return res.json({ errors: `Error: ${err}` });
    }
  }
}

export default new ImageController();

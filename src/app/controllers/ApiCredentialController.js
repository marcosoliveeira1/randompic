import * as Yup from 'yup';
import ApiCredential from '../models/ApiCredential';

class ApiCredentialController {
  async store(req, res) {
    const schema = Yup.object().shape({
      api_name: Yup.string().required(),
      api_secret: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const secretExist = await ApiCredential.findOne({
      where: { api_secret: req.body.api_secret },
    });

    if (secretExist) {
      return res.status(400).json({ error: 'Api secret already exists' });
    }

    const { id, api_name, api_secret } = await ApiCredential.create({
      api_name: req.body.api_name,
      api_secret: req.body.api_secret,
    });

    return res.json({ id, api_name, api_secret });
  }

  async index(req, res) {
    const credentials = await ApiCredential.findAll({
      where: {
        api_name: req.query.service || '',
      },
    });
    return res.json(credentials);
  }

  async update(req, res) {
    return res.json({ error: 'Not implemented yet' });
    // const schema = Yup.object().shape({
    //   api_name: Yup.string().required(),
    //   api_secret: Yup.string().required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' });
    // }

    // const credential = await ApiCredential.findByPk(req.params.id);

    // const credentialExists = await ApiCredential.findOne({
    //   where: {
    //     id: {
    //       $ne: credential.id,
    //     },
    //   },
    // });

    // if (credentialExists) {
    //   return res.status(400).json({ error: 'Credentials already exists' });
    // }

    // // if (oldPassword && !(await user.checkPassword(oldPassword))) {
    // //   return res.status(400).json({ error: 'Password does not match' });
    // // }

    // // const { id, name } = await user.update(req.body);

    // // return res.json({ id, name, email });
  }
}

export default new ApiCredentialController();
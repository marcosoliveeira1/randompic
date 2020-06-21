import Favorite from '../models/Favorite';

class FavoriteController {
  async store(req, res) {
    const { name, description, image_url, service_url } = req.body;

    const favorite = await Favorite.create({
      user_id: req.userId,
      name,
      description,
      url: image_url,
      service_url,
    });

    return res.json(favorite);
  }

  async index(req, res) {
    const { page } = req.query;

    const favorites = await Favorite.findAll({
      where: { user_id: req.userId, is_active: true },
      limit: 20,
      offset: ((page || 1) - 1) * 20,
    });

    return res.json(favorites);
  }

  async delete(req, res) {
    const favorite = await Favorite.findByPk(req.params.id);

    if (!favorite) {
      return res.status(401).json({ error: 'Favorite not founded' });
    }
    if (favorite.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission delete this favorite" });
    }

    favorite.is_active = false;

    await favorite.save();

    return res.json(favorite);
  }
}

export default new FavoriteController();

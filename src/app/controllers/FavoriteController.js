import Favorite from '../models/Favorite';

class FavoriteController {
  async store(req, res) {
    const { name, description, image_url: url, service_url } = req.body;

    const favorite = await Favorite.findOne({
      where: {
        url,
        is_active: true,
      },
    });

    if (favorite) {
      favorite.is_active = false;

      await favorite.save();
      return res.status(200).json(favorite);
    }

    const favoriteAdd = await Favorite.create({
      user_id: req.userId,
      name,
      description,
      url,
      service_url,
    });

    return res.json(favoriteAdd);
  }

  async index(req, res) {
    const { page } = req.query;
    const per_page = 20;

    const total_results = await Favorite.count({
      where: { user_id: req.userId, is_active: true },
    });

    const favorites = await Favorite.findAll({
      where: { user_id: req.userId, is_active: true },
      limit: per_page,
      offset: ((page || 1) - 1) * 20,
    });

    res.set({
      total_results: total_results || 0,
      page,
      per_page,
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

import { Router } from 'express';
import authMiddleware from './app/auth';
import ApiCredentialController from './app/controllers/ApiCredentialController';
import FavoriteController from './app/controllers/FavoriteController';
import ImageController from './app/controllers/ImageController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import ValidatorSessionStore from './app/validators/SessionStore';
import ValidatorUserStore from './app/validators/UserStore';
import ValidatorUserUpdate from './app/validators/UserUpdate';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ msg: 'okey' });
});
routes.post('/users', ValidatorUserStore, UserController.store);
routes.post('/sessions', ValidatorSessionStore, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', ValidatorUserUpdate, UserController.update);

routes.post('/favorites', FavoriteController.store);
routes.get('/favorites', FavoriteController.index);
routes.put('/favorites/:id', FavoriteController.delete);

routes.get('/images', ImageController.index);

routes.post('/credentials', ApiCredentialController.store);
routes.get('/credentials', ApiCredentialController.index);
routes.put('/credentials/:id', ApiCredentialController.update);
routes.delete('/credentials/:id', ApiCredentialController.delete);

export default routes;

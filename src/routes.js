import { Router } from 'express';
import authMiddleware from './app/auth';
import ApiCredentialController from './app/controllers/ApiCredentialController';
import FavoriteController from './app/controllers/FavoriteController';
import ImageController from './app/controllers/ImageController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/favorites', FavoriteController.store);
routes.get('/favorites', FavoriteController.index);
routes.put('/favorites/:id', FavoriteController.delete);

routes.get('/images', ImageController.index);

routes.post('/credentials', ApiCredentialController.store);
routes.get('/credentials', ApiCredentialController.index);
routes.put('/credentials/:id', ApiCredentialController.update);

export default routes;

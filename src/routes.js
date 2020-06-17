import { Router } from 'express';
import authMiddleware from './app/auth';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserControler';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

export default routes;

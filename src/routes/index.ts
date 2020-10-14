import {Router} from 'express';
import ControllerOrphanages from '../controllers/ControllerOrphanages';

const route = Router();

route.post('/orphanages', ControllerOrphanages.create);
route.get('/orphanages', ControllerOrphanages.index);
route.get('/orphanages/:id', ControllerOrphanages.show);

export default route;
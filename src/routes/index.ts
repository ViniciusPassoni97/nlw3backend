import {Router} from 'express';
import ControllerOrphanages from '../controllers/ControllerOrphanages';

const route = Router();

route.post('/orphanages', ControllerOrphanages.index);

export default route;
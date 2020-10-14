import {Router} from 'express';
import ControllerOrphanages from '../controllers/ControllerOrphanages';

import multer from 'multer';
import ConfigMulter from '../config/upload';

const route = Router();
const upload = multer(ConfigMulter);

route.post('/orphanages',upload.array('images') ,ControllerOrphanages.create);
route.get('/orphanages', ControllerOrphanages.index);
route.get('/orphanages/:id', ControllerOrphanages.show);

export default route;
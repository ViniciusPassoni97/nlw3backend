import {Router} from 'express';

const route = Router();

route.get('/',(req,res)=>{
    return res.json({'message':'Hello Word'});
});

export default route;
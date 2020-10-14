import {Router} from 'express';

const route = Router();

route.post('/orphanages',(req,res)=>{
    const {data} = req.body;

    return res.json(data);
});

export default route;
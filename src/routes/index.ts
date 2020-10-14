import {Router} from 'express';
import {getRepository} from 'typeorm';
import ModelOrphanage from '../models/Orphanage';

const route = Router();

interface GetTypeOrphanages{

}

route.post('/orphanages', async (request,response)=>{
    try {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_meekends
        } = request.body;
    
        const orphanagesRepository = getRepository(ModelOrphanage);
    
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_meekends
        });
        
        await orphanagesRepository.save(orphanage);
    
        return response.json(orphanage);  
         
    } catch (error) {
        return response.json(error);
    }
});

export default route;
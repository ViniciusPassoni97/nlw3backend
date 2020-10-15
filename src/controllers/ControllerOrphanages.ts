import {Request,Response} from 'express';
import {getRepository} from 'typeorm';
import ModelOrphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';

export default {
    async show(request:Request,response:Response){
        const {id} = request.params;
        const orphanagesRepository = getRepository(ModelOrphanage);
        const findOrphanages = await orphanagesRepository.findOneOrFail(id,{relations:['images']});

        return response.json(OrphanageView.render(findOrphanages));
    },
    
    async index(request:Request,response:Response){
        const orphanagesRepository = getRepository(ModelOrphanage);
        const listOrphanages = await orphanagesRepository.find({
            relations:['images']
        });
        return response.json(OrphanageView.renderMany(listOrphanages));
    },

    async create(request:Request,response:Response){
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
            
            const orphanagesImages = request.files as Express.Multer.File[];
            const images = orphanagesImages.map(image=>{
                return {path:image.filename}
            })
            
            const orphanage = orphanagesRepository.create({
                    name,
                    latitude,
                    longitude,
                    about,
                    instructions,
                    opening_hours,
                    open_on_meekends,
                    images,
            });  
            await orphanagesRepository.save(orphanage);
            return response.status(201).json(orphanage);          
        } catch (error) {
            return response.json(error);
        }
    }
}
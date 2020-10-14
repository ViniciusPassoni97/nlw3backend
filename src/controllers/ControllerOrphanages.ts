import {Request,Response} from 'express';
import {getRepository} from 'typeorm';
import ModelOrphanage from '../models/Orphanage';

export default {
    async show(request:Request,response:Response){
        const {id} = request.params;
        const orphanagesRepository = getRepository(ModelOrphanage);
        const findOrphanages = await orphanagesRepository.findOneOrFail(id);

        return response.json(findOrphanages);
    },
    async index(request:Request,response:Response){
        const orphanagesRepository = getRepository(ModelOrphanage);
        const listOrphanages = await orphanagesRepository.find();

        return response.json(listOrphanages);
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
            return response.status(201).json(orphanage);          
        } catch (error) {
            return response.json(error);
        }
    }
}
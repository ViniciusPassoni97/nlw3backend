import {Request,Response} from 'express';
import {getRepository} from 'typeorm';
import ModelOrphanage from '../models/Orphanage';
import OrphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

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
            const data = {
                name,
                latitude,
                longitude,
                about,
                instructions,
                opening_hours,
                open_on_meekends:open_on_meekends===true,
                images
            };
            console.log(data);
            const schema = Yup.object().shape({
                name:Yup.string().required(),
                latitude:Yup.number().required(),
                longitude:Yup.number().required(),
                about:Yup.string().required().max(300),
                instructions:Yup.string().required(),
                opening_hours:Yup.string().required(),
                open_on_meekends:Yup.boolean().required(),
                images:Yup.array(
                    Yup.object().shape({
                        path:Yup.string().required()
                    })

                ),
            });

            await schema.validate(data,{
                abortEarly:false,
            });
            const orphanage = orphanagesRepository.create(data);
            console.log(orphanage);  
            const res = await orphanagesRepository.save(orphanage);
            console.log(res);
            return response.status(201).json(orphanage);          
        } catch (error) {
            return response.json(error);
        }
    }
}
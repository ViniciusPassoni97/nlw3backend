import modelOrphanage from '../../src/models/Orphanage';
import viewImage from '../views/images_views';
export default {
    render(orphanage:modelOrphanage){
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about:orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_meekends: orphanage.open_on_meekends,
            images:viewImage.renderMany(orphanage.images),
        }
    },
    renderMany(orphanages:modelOrphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}
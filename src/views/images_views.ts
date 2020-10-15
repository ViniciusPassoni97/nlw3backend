import modelImage from '../../src/models/Images';
export default {
    render(image:modelImage){
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`,
        }
    },
    renderMany(image:modelImage[]){
        return image.map(image => this.render(image));
    }
}
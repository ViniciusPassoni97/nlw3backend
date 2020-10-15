import {ErrorRequestHandler} from 'express';
import {ValidationError} from 'yup';

interface ValidationErros {
    [key:string]:string[];
}

const erroHandler:ErrorRequestHandler = (error,request,response,next) => {
    if(error instanceof ValidationError){
        let errors: ValidationErros ={
        }
        error.inner.forEach(err => {
            errors[err.path]=err.errors;
        });
        return response.status(400).json({message:'Erro de validação de dados',errors});
    }
    
    console.error(error);

    return response.status(500).json({message:'Internal server error'});
}

export default erroHandler;
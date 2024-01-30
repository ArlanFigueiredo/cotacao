export class EmpresaAlredyExistsError extends Error{
    constructor(){
        super('Empresa alredy exists.');
    }
}
export class EmpresaDoesNotExistsError extends Error{
    constructor(){
        super('Empresa does not exists.');
    }
}
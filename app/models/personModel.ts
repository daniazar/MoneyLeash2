
export class Person {
    created: Date;
    first: string;
    last: string;
    rol: string;
    CUIT: string;
    beneficiario: string;
    id: string;
    constructor(first: string, last: string, rol: string, CUIT: string, beneficiario: string, created ?: Date, id?:string) {

        this.created = created;
        this.first = first;
        this.last = last;
        this.rol = rol;
        this.CUIT = CUIT;
        this.beneficiario = beneficiario;
        this.id = id;
    }



}

import {Person} from './personModel'
export type ticketType = "FC" | "NC" | "TK";
export type ticketOptions = "A" | "B" | "C";
export type TaxOptions = "No Gravado" | "Neto gravado al 21%" | "Neto Gravado al 27%" | "Neto Gravado al 10.5%";


export class Ticket {
    typ: ticketType;
    opt: ticketOptions;
    num: number;
}

export class AFIPInfo {
    periodo: string;
    cuota: number;
    lugarDePago: number;
    sucursal: string;
    terminal: string;
    usuario: string;
    conceptop: string;
    subConc: string;
    retentionDate: string;
    retentionAgent: string;
    sujetoRetenido: string;
}

export class Expense {
    created: Date;
    expenseDate: Date;
    bank: string;
    checkNum: string;
    detail: string;
    location: string;
    ticket: Ticket;
    vendor: Person;
    tags: string[] //(movies for example)
    category: string;
    subCategory: string;
    amount: number;
    taxOptions: TaxOptions;
    comments: string;
    IVAretention: number;
    IIBBretention: number;
    AFIP: boolean;
    AFIPdata: AFIPInfo;
    id: string;



    constructor(created: Date, expenseDate: Date, bank: string, checkNum: string, detail: string, location: string, ticket: Ticket, vendor: Person,
        tags: string[] , category: string, subCategory: string, amount: number, taxOptions: TaxOptions, comments: string, IVAretention: number,
        IIBBretention: number, AFIP: boolean, AFIPdata?: AFIPInfo, id?: string) {

        this.created = created;
        this.expenseDate = expenseDate;
        this.bank = bank;
        this.checkNum = checkNum;
        this.detail = detail;
        this.location = location;
        this.ticket = ticket;
        this.location = location;
        this.vendor = vendor;
        this.tags = tags;
        this.category = category;
        this.subCategory = subCategory;
        this.amount = amount;
        this.taxOptions = taxOptions;
        this.comments = comments;
        this.IVAretention = IVAretention;
        this.IIBBretention = IIBBretention;
        this.AFIP = AFIP;
        this.AFIPdata = AFIPdata;
        this.id = id;
    }



}

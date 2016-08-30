import {Account} from './accountModels';

export class Company {
    name: string;
    icon: string;
    id: string;
    accounts: Account[];
    details: string[];
    locations: string[];
    constructor(name: string, icon: string, id?: string, accounts?: Account[], details?: string[], locations?: string[]) {
        this.name = name;
        this.icon = icon;
        this.id = id;
        this.accounts = accounts || [];
        this.details = details || [];
        this.locations = locations || [];
    }

    addAccount(account) {
        this.accounts.push(account);
    }
    RemoveAccount(account) {
        this.accounts.filter( a => a!==account);
    }



}

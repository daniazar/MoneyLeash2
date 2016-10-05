import {Account} from './accountModels';
import {ListElement} from './listElement';
export class Company implements ListElement {
    name: string;
    icon: string;
    id: string;
    editable: boolean;
    deleteable: boolean;

    accounts: Account[];
    details: string[];
    locations: string[];
    category: string[];
    subCategory: string[];
    expenseType: string[];
    constructor(name: string, icon: string, accounts: Account[], details: string[], locations: string[], category: string[], subCategory: string[], expenseType: string[],  id?: string) {
        this.name = name;
        this.icon = icon;
        this.id = id;
        this.accounts = accounts || [];
        this.details = details || [];
        this.locations = locations || [];
        this.category = category || [];
        this.subCategory = subCategory || [];
        this.expenseType = expenseType || [];

    }

    addAccount(account) {
        this.accounts.push(account);
    }
    RemoveAccount(account) {
        this.accounts.filter( a => a!==account);
    }


    selectElement(): void {
        //show accounts.
    };
    edit(): void {
        //show edit screen
    }
    delete(): void {
        //show delete screen
    }
    
    static addElement(): void {
        
    }
}

import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';
import {Account} from '../models/AccountModel';

declare var firebase: any;

@Injectable()
export class DataService {

    public selectedCompany: Company;
    public selectedAccount: Account;
    public user: any;

    public userDataCompany: any;
    constructor() {
        this.user = firebase.auth().currentUser;
    }
}
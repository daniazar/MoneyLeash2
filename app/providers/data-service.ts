import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';
import {Account} from '../models/AccountModel';

declare var firebase: any;

@Injectable()
export class DataService {

    public selectedCompany;
    public selectedAccount;
    public user: any;
    public companyId;
    public accountId;
    public userDataCompany: any;
    constructor() {
        this.user = firebase.auth().currentUser;
    }
}
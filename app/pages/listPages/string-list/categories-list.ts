import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Account, ReportMonth} from '../../../models/accountModel';
import {Company} from '../../../models/companyModel';
import {DataService} from '../../../providers/data-service';

import {CompanyService} from '../../../providers/company-provider';
import {AccountService} from '../../../providers/account-provider';
import {ReportService} from '../../../providers/report-provider';

import {CategoriesModal} from '../../addPages/add-string/add-categories';

@Component({
    templateUrl: 'build/pages/listPages/string-list/string-list.html',

})

export class CategoriesListPage {
    login: { username?: string, password?: string } = {};
    submitted = false;
    elements;
    constructor(
        public nav: NavController, public accountService: AccountService, public companyService: CompanyService, public reportService: ReportService, public dataService: DataService) {
        this.elements = []
        this.companyService.get(dataService.companyId).subscribe((val) => {
            this.elements = companyService.getCategories(val);
        });
    }
    title = 'Categories';
    details: string[];
    locations: string[];
    category: string[];
    subCategory: string[];
    expenseType: string[];

    public selectElement(account: Account) {
        /*this.accountService.getAccount(account.id).then((val) => {
            this.dataService.selectedAccount = val;
            //this.nav.push(AccountListPage, { animate: true, direction: 'up' });
        });*/
    }

    public openModal() {
        //this.nav.push(CompanyModal, { animate: true, direction: 'up' });
    }

    public addElement() {
        this.nav.push(CategoriesModal, { animate: true, direction: 'up' });
    }


}



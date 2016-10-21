import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Account, ReportMonth} from '../../../models/accountModel';
import {Company} from '../../../models/companyModel';
import {DataService} from '../../../providers/data-service';

import {CompanyService} from '../../../providers/company-provider';
import {AccountService} from '../../../providers/account-provider';
import {ReportService} from '../../../providers/report-provider';

import {LocationsModal} from '../../addPages/add-string/add-locations';

@Component({
    templateUrl: 'build/pages/listPages/string-list/string-list.html',

})

export class LocationsListPage {
    login: { username?: string, password?: string } = {};
    submitted = false;
    elements;
    constructor(
        public nav: NavController, public accountService: AccountService, public companyService: CompanyService, public reportService: ReportService, public dataService: DataService) {
        this.elements = []
        this.companyService.get(dataService.companyId).subscribe((val) => {
            this.elements = companyService.getLocation(val);
        });
    }
    title = 'Location'

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
        this.nav.push(LocationsModal, { animate: true, direction: 'up' });
    }


}



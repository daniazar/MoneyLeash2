import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Account, ReportMonth} from '../../../models/accountModel';
import {Company} from '../../../models/companyModel';
import {DataService} from '../../../providers/data-service';

import {CompanyService} from '../../../providers/company-provider';
import {AccountService} from '../../../providers/account-provider';
import {ReportService} from '../../../providers/report-provider';

import {ExpenseModal} from '../../addPages/add-expense/add-expense';

@Component({
    templateUrl: 'build/pages/listPages/report-list/report-list.html',

})

export class ReportListPage {
    login: { username?: string, password?: string } = {};
    submitted = false;
    elements: ReportMonth[];
    title;
    balance;
    currency;
    constructor(
        public nav: NavController, public accountService: AccountService, public companyService: CompanyService, public reportService: ReportService, public dataService: DataService) {
        this.elements = []
        this.reportService.getAll().subscribe((val) => {
            this.elements.push(val);
        });
        this.accountService.get(dataService.accountId).subscribe((val) => {
            this.balance = val.balance;
            this.currency = val.currency;
        });

        this.title = dataService.selectedAccount.name;
        this.balance = 10;
        //   this.accounts = [new Account('hola', 'icono'), new Account('2', 'rose') ];
    }

    private openAbout(): void {
        //this.nav.push(AboutPage);
        //console.log(this.auth.authenticated);
    }
    public selectElement(account: Account) {
        this.accountService.getAccount(account.id).then((val) => {
            this.dataService.selectedAccount = val;
            //this.nav.push(AccountListPage, { animate: true, direction: 'up' });
        });
    }

    public openModal() {
        //this.nav.push(CompanyModal, { animate: true, direction: 'up' });
    }

    public addElement() {
        this.nav.push(ExpenseModal, { animate: true, direction: 'up' });
    }


}



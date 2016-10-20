import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Account} from '../../models/accountModel';
import {Company} from '../../models/companyModel';
import {DataService} from '../../providers/data-service';
import {AccountModal} from '../addPages/add-company/add-account';
import {ReportListPage} from './report-list/report-list';


import {CompanyService} from '../../providers/company-provider';
import {AccountService} from '../../providers/account-provider';

@Component({
    templateUrl: 'build/pages/listPages/element-list.html',

})

export class AccountListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  elements: Account[];
  constructor(
      public nav: NavController, public accountService: AccountService, public companyService: CompanyService, public dataService: DataService) {
      this.elements = []
      this.accountService.getAll().subscribe((val) => {
          this.elements.push(val);

      });


   //   this.accounts = [new Account('hola', 'icono'), new Account('2', 'rose') ];
  }
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  public selectElement(account: Account) {
      this.dataService.selectedAccount = account;
      this.nav.push(ReportListPage, { animate: true, direction: 'up' });
  }

  public openModal() {
      //this.nav.push(CompanyModal, { animate: true, direction: 'up' });
  }

  public addElement() {
      this.nav.push(AccountModal, { animate: true, direction: 'up' });
  }


}



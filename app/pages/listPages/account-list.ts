import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Account} from '../../models/accountModel';
import {Company} from '../../models/companyModel';
import {DataService} from '../../providers/data-service';

import {CompanyService} from '../../providers/company-provider';
import {AccountService} from '../../providers/account-provider';

@Component({
    templateUrl: 'build/pages/mymoney/element-list.html',
    providers: [AccountService, CompanyService, DataService]

})

export class AccountListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  elements: Account[];
  constructor(
      public nav: NavController, public accountService: AccountService, public companyService: CompanyService, public dataService: DataService) {
      this.elements = company.account;

   //   this.accounts = [new Account('hola', 'icono'), new Account('2', 'rose') ];
  }
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  private openAbout(): void {
      //this.nav.push(AboutPage);
      //console.log(this.auth.authenticated);
  }
  public selectElement(account: Account) {
      this.accountService.getAccount(account.id).then((val) => {
          this.dataService.selectedAccount = val;
          this.nav.push(AccountListPage, { animate: true, direction: 'up' });

      });

  }

  public openModal() {
      this.nav.push(CompanyModal, { animate: true, direction: 'up' });
  }

}



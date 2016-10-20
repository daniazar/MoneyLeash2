import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Company} from '../../../models/CompanyModel';
import {CompanyService} from '../../../providers/company-provider';
import {AccountService} from '../../../providers/account-provider';
import {ICONS} from '../../../models/iconsOption';


@Component({
    templateUrl: 'build/pages/addPages/add-company/add-company.html',

})

export class AccountModal {
  login: {username?: string, password?: string} = {};
  submitted = false;
  elements: Company[];
  icons = ICONS;
  name = '';
  myIcon = '';
  title = 'Account';

  constructor(
      public nav: NavController, public companyService: CompanyService, public accountService: AccountService) {
      //console.log(ICONS);
  }
      
  private onSubmit(): void {
      this.accountService.add({ name: this.name, icon: this.myIcon });
      this.nav.pop();
  }
  
}
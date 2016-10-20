import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Company} from '../../../models/CompanyModel';
import {CompanyService} from '../../../providers/company-provider';
import {ICONS} from '../../../models/iconsOption';


@Component({
    templateUrl: 'build/pages/addPages/add-expense/add-expense.html',
    providers: [CompanyService]

})

export class ExpenseModal {
  login: {username?: string, password?: string} = {};
  submitted = false;
  elements: Company[];
  icons = ICONS;
  name = '';
  myIcon = '';
  constructor(
      public nav: NavController, public companyService: CompanyService) {
      //console.log(ICONS);
  }
      
  private onSubmit(): void {
      this.companyService.addCompany({ name: this.name, icon: this.myIcon });
      this.nav.pop();
  }
  
}
import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Company} from '../../../models/CompanyModel';
import {ICONS} from '../../../models/iconsOption';
import {DataService} from '../../../providers/data-service';

import {CompanyService} from '../../../providers/company-provider';
import {AccountService} from '../../../providers/account-provider';
import {ReportService} from '../../../providers/report-provider';


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
  expense = { currency: null};  
    details;
    locations;
    expenseTypes;
    categories;
    ticket = {};
    AFIPInfo = {};
  constructor(
      public nav: NavController, public accountService: AccountService, public companyService: CompanyService, public reportService: ReportService, public dataService: DataService) {
      //console.log(ICONS);

      this.accountService.get(dataService.accountId).subscribe((val) => {
          //this.balance = val.balance;
          this.expense.currency = val.currency;
      });

      this.companyService.get(dataService.companyId).subscribe((val) => {
          this.details = companyService.getDetails(val);
          this.locations = companyService.getLocation(val);
          this.expenseTypes = companyService.getExpenseType(val);
          this.categories = companyService.getCategories(val);
      });

      
  }
      
  private onSubmit(): void {
      this.companyService.addCompany({ name: this.name, icon: this.myIcon });
      this.nav.pop();
  }
  
}
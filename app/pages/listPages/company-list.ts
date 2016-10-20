import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Company} from '../../models/CompanyModel';
import {CompanyService} from '../../providers/company-provider';
import {DataService} from '../../providers/data-service';

import {CompanyModal} from '../addPages/add-company/add-company';
import {AccountListPage} from '../listPages/account-list';

@Component({
    templateUrl: 'build/pages/listPages/element-list.html',

})

export class CompanyListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  elements: Company[] = [];
  title = 'Company';
  constructor(
      public nav: NavController, public companyService: CompanyService, public dataService: DataService) {
      this.elements = [];
      var callback = (val) => {
          this.elements.push(val);
      };
      //var test = new Company('name', 'icon', 'id')

      companyService.getAll().subscribe((callback));
  }

  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  public selectElement(company: Company) {
      this.dataService.companyId = company.id;
      this.companyService.get(company.id).subscribe();

      this.nav.push(AccountListPage, { animate: true, direction: 'up' });
  }

  public addElement() {
      this.nav.push(CompanyModal, { animate: true, direction: 'up' });
  }

}

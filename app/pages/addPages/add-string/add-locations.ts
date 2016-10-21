import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Company} from '../../../models/CompanyModel';
import {CompanyService} from '../../../providers/company-provider';
import {AccountService} from '../../../providers/account-provider';
import {ICONS} from '../../../models/iconsOption';


@Component({
    templateUrl: 'build/pages/addPages/add-string/add-string.html',

})

export class LocationsModal {
  login: {username?: string, password?: string} = {};
  submitted = false;
  name = '';

  title = 'Locations';

  constructor(
      public nav: NavController, public companyService: CompanyService, public accountService: AccountService) {
      //console.log(ICONS);
  }
      
  private onSubmit(): void {
      this.companyService.addLocation(this.name);
      this.nav.pop();
  }
  
}
import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Company} from '../../../models/CompanyModel';
import {ComnpanyService} from '../../../providers/company-provider';
import {CompanyModal} from '../../addPages/add-company/add-company';


@Component({
    templateUrl: 'build/pages/listPages/company-list/company-list.html',
    providers: [ComnpanyService]

})

export class CompanyListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  elements: any[];
  constructor(
      public nav: NavController, public companyService: ComnpanyService) {
      var callback = (dataSnapshot) => {
          var aux = dataSnapshot.val();
          this.elements = [];
          for (var key in aux) {
              if (aux.hasOwnProperty(key)) {
                  this.elements.push(aux[key]);
              }
          }
          console.log(aux);
      };
      companyService.getCompanyList(callback);
   //   this.accounts = [new Account('hola', 'icono'), new Account('2', 'rose') ];
  }
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
    

  public openModal() {
      this.nav.push(CompanyModal, { animate: true, direction: 'up' });
  }
  
}
import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {Account} from '../../../providers/accountModels';
@Component({
  templateUrl: 'build/pages/mymoney/account-list/account-list.html'
})

export class AccountListPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  accounts: Account[];
  constructor(
      public nav: NavController) {
      this.accounts = [new Account('hola', 'icono'), new Account('2', 'rose') ];
  }
      
  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}
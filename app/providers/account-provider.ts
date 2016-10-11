import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';
import {Account} from '../models/AccountModel';

declare var firebase: any;

@Injectable()
export class AccountService {

  public user: any;
  public userdata: any;
  public accounts: any;
  public companyData: any;

  constructor() {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
    this.accounts = firebase.database().ref('/accounts/');
    this.companyData = firebase.database().ref('/company/');
  }

    getAccountList(selectedCompany : any, callback) {
        return this.companyData.child(selectedCompany.id).child('accounts').on("value", callback)/*.then(function (snapshot) {
            var data = snapshot.val();
            //this.companyList = data;
            console.log(data);
        })*/;
    }

    addAccount(company: Company, account: Account) {

        var newAccount = this.accounts.push();
        newAccount.set({
            name: account.name,
            icon: account.icon,
            balance: 0
        });
        // we can also chain the two calls together
        var inCompany = this.companyData.child(company.id + '/accounts/' ).push();
        inCompany.set({
            name: account.name,
            icon: account.icon,
            id: newAccount.key
        });
    }

    getAccount(id: any) {
        return this.accounts.child(id).once("value");
    }

    addAccountToCompany(company: Company, account: Account) {
        var newAccount = this.companyData.child(company.id).child('Acount').push();
        newAccount.set(account);
    }

}

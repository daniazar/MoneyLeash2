import {Injectable} from '@angular/core';

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

    addAccount(company: any, account: any) {

        var newAccount = this.accounts.push();
        newAccount.set({
            name: company.name,
            icon: company.icon,
            balance: 0
        });
        // we can also chain the two calls together
        var inCompany = this.companyData.child(company.id + '/accounts/' ).push();
        inCompany.set({
            name: company.name,
            icon: company.icon,
            id: newAccount.key
        });
    }

    getAccount(id: any) {
        return this.accounts.child(id).once("value");
    }

    addAccountToCompany(companyId: any, account: any) {
        var newAccount = this.companyData.child(companyId).child('Acount').push();
        newAccount.set(account);
    }
}

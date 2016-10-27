import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';
import {Expense} from '../models/ExpenseModel';
import {Account} from '../models/AccountModel';
import {DataService} from './data-service';
import {Observable} from 'rxjs/observable';


declare var firebase: any;

@Injectable()
export class AccountService {

  public user: any;
  public userdata: any;
  public accounts: any;
  public companyData: any;

  constructor(public dataService: DataService) {
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

    getAll(): Observable<Account> {
        return Observable.create(observer => {
            let accountData = this.companyData.child(this.dataService.companyId).child('accounts');
            let listener = accountData.on('child_added', snapshot => {
                let data = snapshot.val();
                observer.next(
                    //new Account(data.name, data.icon, data.id));
                    { name: data.name, icon: data.icon, id: data.id });
            }, observer.error);
            return () => {
                accountData.off('child_added', listener);
            };
        });
    }


    add( account) {

        var newAccount = this.accounts.push();
        newAccount.set({
            name: account.name,
            icon: account.icon,
            balance: 0

        });
        // we can also chain the two calls together
        var inCompany = this.companyData.child(this.dataService.companyId + '/accounts/' ).push();
        inCompany.set({
            name: account.name,
            icon: account.icon,
            id: newAccount.key
        });
    }

    getAccount(id: any) {
        return this.accounts.child(id).once("value");
    }

    get(id: string): Observable<Account> {
        return Observable.create(observer => {

            let listener = this.accounts.child(id).on("value", snapshot => {
                let data = snapshot.val();
                let account = { name: data.name, icon: data.icon, id: data.id, balance: data.balance, reports: data.reports }
                this.dataService.selectedAccount = account;

                observer.next(
                    //return new Company(data.name, data.icon, data.id, data.accounts, data.details, data.locations, data.category, data.subCategory, data.expenseType);
                    account
                );

            }, observer.error);
            return () => {
                this.accounts.child(id).off("value", listener);
            };
        });
    }


    addAccountToCompany(company: Company, account: Account) {
        var newAccount = this.companyData.child(company.id).child('Acount').push();
        newAccount.set(account);
    }

    createReport(expense: Expense, account: Account) {
        var newAccount = this.companyData.child(company.id).child('Acount').push();
        newAccount.set(account);
    }


}

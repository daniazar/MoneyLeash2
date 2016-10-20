import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';
import {Account, ReportMonth} from '../models/AccountModel';

import {DataService} from './data-service';
import {Observable} from 'rxjs/observable';


declare var firebase: any;

@Injectable()
export class ReportService {

  public user: any;
  public userdata: any;
  public accounts: any;
  public companyData: any;
  public reports: any;

  constructor(public dataService: DataService) {
    this.user = firebase.auth().currentUser;
    this.userdata = firebase.database().ref('/users/');
    this.accounts = firebase.database().ref('/accounts/');
    this.reports = firebase.database().ref('/reports/');
    this.companyData = firebase.database().ref('/company/');
  }

    getAll(): Observable<ReportMonth> {
        return Observable.create(observer => {
            let accountData = this.accounts.child(this.dataService.selectedAccount.id).child('reports');
            let listener = accountData.on('child_added', snapshot => {
                let data = snapshot.val();
                observer.next(
                    //new Account(data.name, data.icon, data.id));
                    { name: data.name, amount: data.amount, id: data.id, monthCode: data.monthCode });
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
    

}

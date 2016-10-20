import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';
import {Observable} from 'rxjs/observable';
import {DataService} from './data-service'
declare var firebase: any;

@Injectable()
export class CompanyService {

    public user: any;
    public userData: any;
    public companyData: any;
    public companyList: any[];
    public selectedCompany: Company;
    public callback;
    public userDataCompany: any;
    constructor(public dataService: DataService) {
        this.user = firebase.auth().currentUser;
        this.userData = firebase.database().ref('/users/');
        this.userDataCompany = this.userData.child(this.user.uid + '/company/');
        this.companyData = firebase.database().ref('/company/');

    }
  getAll(): Observable<Company> {
    return Observable.create(observer => {
      let listener = this.userDataCompany.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(
//            new Company(data.name, data.icon, data.id));
            { name: data.name, icon: data.icon, id: data.id });
      }, observer.error);
      return () => {
        this.userDataCompany.off('child_added', listener);
      };
    });
  }

  getCompanyList(callback) {
        var self = this;

        return this.userDataCompany.on("value", (snapshot) => {
            var data = snapshot.val();
            self.companyList = [];
            for (var key in data) {
                //var company = new Company(data[key].name, data[key].icon, data[key].id);
                var company = { name: data[key].name, icon: data[key].icon, id: data[key].id };

                self.companyList.push(company);
            }
            console.log(self.companyList);
            callback(self.companyList);
            return self.companyList;
        });
    }

    addCompany(company: any) {

        var newCompany = this.companyData.push();
        newCompany.set({
            name: company.name,
            icon: company.icon
        });
        // we can also chain the two calls together
        var inuser = this.userDataCompany.push();
        inuser.set({
            name: company.name,
            icon: company.icon,
            id: newCompany.key
        });
    }

    get(id: string): Observable<Company> {
        return Observable.create(observer => {

            let listener = this.companyData.child(id).on("value", snapshot => {
                let data = snapshot.val();
                let company = { name: data.name, icon: data.icon, id: data.id, accounts: data.accounts, details: data.details, locations: data.locations, category: data.category, subCategory: data.subCategory, expenseType: data.expenseType }
                this.dataService.selectedCompany = company;

                observer.next(
                    //return new Company(data.name, data.icon, data.id, data.accounts, data.details, data.locations, data.category, data.subCategory, data.expenseType);
                    company
                );

            }, observer.error);
            return () => {
                this.companyData.child(id).off("value", listener);
            };
        });
    }


    getCompany(id: any) {
        return this.companyData.child(id).on("value").then((data) => {
            data = data.val();
            //return new Company(data.name, data.icon, data.id, data.accounts, data.details, data.locations, data.category, data.subCategory, data.expenseType);
            return { name: data.name, icon: data.icon, id: data.id, accounts: data.accounts, details: data.details, locations: data.locations, category: data.category, subCategory: data.subCategory, expenseType: data.expenseType };

        });
    }

    getDetails(company) {
        var data = company.details;
        var details = [];
        for (var key in data) {
            //var company = new Company(data[key].name, data[key].icon, data[key].id);
            var detail = { name: data[key].name};
            
            details.push(detail);
        }
        return details;

    }

    addDetails(details) {
        
        var newRef = this.companyData.child(this.dataService.selectedCompany.id).child('details').push();
        newRef.set( details );
    }


    addAccountToCompany(company: Company, account: any) {
        this.companyData.child(company.id);

    }
}

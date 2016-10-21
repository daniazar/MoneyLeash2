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
    getExpenseType(company) {
        var data = company.expenseType;
        var expenseTypes = [];
        for (var key in data) {
            var expenseType = { name: data[key] };
            expenseTypes.push(expenseType);
        }
        return expenseTypes;
    }

    addExpenseType(expenseType) {
        var newRef = this.companyData.child(this.dataService.companyId).child('expenseType').push();
        newRef.set(expenseType);
    }

    getLocation(company) {
        var data = company.locations;
        var locations = [];
        for (var key in data) {
            var location = { name: data[key] };
            locations.push(location);
        }
        return locations;
    }

    addLocation(location) {
        var newRef = this.companyData.child(this.dataService.companyId).child('locations').push();
        newRef.set(location);
    }


    getCategories(company) {
        var data = company.category;
        var categories = [];
        for (var key in data) {
            var category = { name: data[key] };
            categories.push(category);
        }
        return categories;
    }

    addCategory(category) {
        var newRef = this.companyData.child(this.dataService.companyId).child('category').push();
        newRef.set(category);
    }

    getDetails(company) {
        var data = company.details;
        var details = [];
        for (var key in data) {
            var detail = { name: data[key]};
            details.push(detail);
        }
        return details;
    }

    addDetails(details) {
        var newRef = this.companyData.child(this.dataService.companyId).child('details').push();
        newRef.set( details );
    }


    addAccountToCompany(company: Company, account: any) {
        this.companyData.child(company.id);

    }
}

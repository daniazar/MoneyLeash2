import {Injectable} from '@angular/core';
import {Company} from '../models/CompanyModel';

declare var firebase: any;

@Injectable()
export class CompanyService {

    public user: any;
    public userData: any;
    public companyData: any;
    public companyList: Company[];
    public selectedCompany: Company;

    public userDataCompany: any;
    constructor() {
        this.user = firebase.auth().currentUser;
        this.userData = firebase.database().ref('/users/');
        this.userDataCompany = this.userData.child(this.user.uid + '/company/');
        this.companyData = firebase.database().ref('/company/');
    }

    getCompanyList() {
        return this.userDataCompany.on("value").then(function (snapshot) {
            var data = snapshot.val();
            this.companyList = [];
            for (var key in data) {
                var company = new Company(data[key].name, data[key].icon, data[key].id);
                this.companyList.push(company);
            }
            console.log(this.companyList);
            return this.companyList;
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

    getCompany(id: any) {
        return this.companyData.child(id).once("value").then((data) => {
            data = data.val();
            return new Company(data.name, data.icon, data.id, data.accounts, data.details, data.locations, data.category, data.subCategory, data.expenseType);
        });
    }

    addAccountToCompany(company: Company, account: any) {
        this.companyData.child(company.id);

    }
}
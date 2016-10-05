import {Injectable} from '@angular/core';

declare var firebase: any;

@Injectable()
export class ComnpanyService {

    public user: any;
    public userData: any;
    public companyData: any;
    public companyList: any;
    public userDataCompany: any;
    constructor() {
        this.user = firebase.auth().currentUser;
        this.userData = firebase.database().ref('/users/');
        this.userDataCompany = this.userData.child(this.user.uid + '/company/');
        this.companyData = firebase.database().ref('/company/');
    }

    getCompanyList(callback) {
        return this.userDataCompany.on("value", callback)/*.then(function (snapshot) {
            var data = snapshot.val();
            //this.companyList = data;
            console.log(data);
        })*/;
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
        return this.companyData.child(id).once("value");
    }

    addAccountToCompany(companyId: any, account: any) {
        this.companyData.child(id)

    }
}
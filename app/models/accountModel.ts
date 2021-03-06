//import {FirebaseService} from './firebaseService';

// Firebase
//declare var firebase: any;

/*export interface IMyHouse {
  //dateCreated: number;
  houseid: string;
  housejoincode: string;
  housenumber: number;
}

export class MyHouse implements IMyHouse {
  
  //public dateCreated: number = firebase.database['ServerValue']['TIMESTAMP'];  
  public houseid: string;
  public housejoincode: string;
  public housenumber: number;

  constructor() {}
  createAccount() {
      let userId : String = FirebaseService.uid();
 // Create a new node under houses and get the key
    var accountKey = firebase.database().ref('Accounts').push().key;

    // Save reference of new house key to the myhouses.houseid node 
    firebase.database().ref('/users/' + this.uid() + '/accounts').push(accountKey)//.update({houseid : key});
    //this.myHousePointer.houseid = key;

    // Save reference of new key to the myhouses.houseid node
    firebase.database().ref('/Accounts/' + key + "/members/" + this.uid()).update(housemember);

    // Save default Account Types
    var refTypes = firebase.database().ref('/Accounts/' + key + "/memberaccounttypes/");
    refTypes.push({ name: 'Checking', icon: '0' });
    refTypes.push({ name: 'Savings', icon: '0' });
    refTypes.push({ name: 'Credit Card', icon: '0' });
    refTypes.push({ name: 'Debit Card', icon: '0' });
    refTypes.push({ name: 'Investment', icon: '0' });
    refTypes.push({ name: 'Brokerage', icon: '0' });


}   // firebase.database().ref('/houses/' + key + "/housemembers/" + this.uid()).update(housemember);

  
}*/

export class ReportMonth {
    reportId: string;
    accountId: string;
    monthCode: number;
    amount: number;
    constructor(reportId: string, accountId: string, monthCode: number) {
        this.reportId = reportId;
        this.monthCode = monthCode;
    }

    encodeMonth(date: Date) {
        return date.getFullYear() * 100 + date.getMonth();
    }
    decodeMonth(date: number): Date {
        let month: number = date % 100;
        let year: number = Math.floor(date / 100);
        return new Date(year, month);
    }

}

export class Account {
    name: string;
    icon: string;
    id: string;
    balance: number;
    reports: ReportMonth[];
    currency: string;
    constructor(name: string, icon: string, id: string, balance?: number, reports?: ReportMonth[]   ) {
        this.name = name;
        this.icon = icon;
        this.id = id;
        this.reports = reports;
        this.balance = balance;
    }

    

}

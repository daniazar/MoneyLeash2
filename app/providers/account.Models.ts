import {FirebaseService} from './firebaseService';

// Firebase
declare var firebase: any;

export interface IMyHouse {
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


}    firebase.database().ref('/houses/' + key + "/housemembers/" + this.uid()).update(housemember);

  
  }

import {Component} from '@angular/core';
import {NavController, MenuController, Alert} from 'ionic-angular';
import {ListElement} from '../../models/listElement';
@Component({
    templateUrl: 'build/pages/listable-list/listable-list.html'
})

export class ListPage<T extends ListElement > {
  submitted = false;
  elements: T[];
  editable: boolean = false;
  deleteable: boolean = false;
  title: string = 'placeholder';


  constructor(
      public nav: NavController, title: string, elements: T[]) {
      this.title = title;
      this.elements = elements//[new ListElement('name', 'icon'), new ListElement('name', 'icon')];
  }

  private openAbout(): void {
    //this.nav.push(AboutPage);
    //console.log(this.auth.authenticated);
  }
  
}
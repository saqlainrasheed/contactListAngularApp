import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataServiceService } from './data-service.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Contact Book';
  contacts: Array<any>;
  displayedColumns = ['firstName', 'lastName', 'email', 'edit', 'delete'];
  searchResult: any;
  contactCopy: any;
  obs: Subscription;

  constructor(
    private dataService: DataServiceService,
    private store: AngularFirestore
  ) {}

  ngOnInit() {
    this.contacts = this.dataService.getData();
    this.contactCopy = this.contacts;
  }

  deleteContact(contact: any) {
    this.dataService.deleteData(contact);
  }

  search(e) {
    const q = e.target.value;
    // this.obs = this.contacts
    //   .pipe(debounceTime(2000))
    //   .subscribe((d) => console.log(d));

    if (q) {
      this.searchResult = this.dataService.search(q);
      this.contacts = this.searchResult;
    } else {
      this.contacts = this.contactCopy;
    }
  }

  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}

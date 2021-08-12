import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private data: any;

  constructor(private store: AngularFirestore) {
    this.data = this.store
      .collection('contacts')
      .valueChanges({ idField: 'id' });
  }

  getData() {
    return this.data;
  }

  addData(item: object) {
    return new Promise<any>((resolve, reject) => {
      this.store
        .collection('contacts')
        .add(item)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  deleteData(contact: any) {
    return this.store.collection('contacts').doc(contact.id).delete();
  }

  search(query: string) {
    return this.store
      .collection('contacts', (ref) => ref.orderBy('email').startAt(query))
      .valueChanges();
  }

  edit(contact: any, id: any) {
    return this.store.collection('contacts').doc(id).update({
      firstName: contact.firstName,
      lastName: contact.lastName,
      designation: contact.designation,
      email: contact.email,
      phoneNumbers: contact.phoneNumbers,
      longitude: contact.longitude,
      latitude: contact.latitude,
    });
  }

  getUserDoc(id) {
    return this.store.collection('contacts').doc(id).valueChanges();
  }
}

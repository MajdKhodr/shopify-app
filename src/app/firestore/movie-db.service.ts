import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { MovieEntry } from '../models/movie-entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  constructor(private firestore: AngularFirestore) { }

  getAddresses(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('nomination-list').snapshotChanges();
  }

  // createAddress(address: MovieEntry): Promise<DocumentReference> {
  //   // delete address.id;
  //   return this.firestore.collection('addresses').add({...address});
  // }

  // updateAddress(address: MovieEntry): Promise<void> {
  //   const addressId = address.id;
  //   delete address.id;
  //   return this.firestore.collection('addresses').doc(addressId).update(address);
  // }

  deleteAddress(addressId: string): Promise<void> {
    return this.firestore.collection('addresses').doc(addressId).delete();
  }
}

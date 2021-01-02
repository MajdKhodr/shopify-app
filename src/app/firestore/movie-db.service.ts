import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { MovieEntry } from '../models/movie-entry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  constructor(private firestore: AngularFirestore) { }

  getNominationList(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firestore.collection('nomination-list').snapshotChanges();
  }

  deleteNominee(movieId: string): Promise<void> {
    return this.firestore.collection('nomination-list').doc(movieId).delete();
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
}

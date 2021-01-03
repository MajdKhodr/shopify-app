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

  addNominee(movie: MovieEntry): Promise<DocumentReference> {
    return this.firestore.collection('addresses').add({...movie});
  }
}

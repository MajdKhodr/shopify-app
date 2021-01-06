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

  addNominee(movie: MovieEntry): Promise<DocumentReference> {
    delete movie.id;
    return this.firestore.collection('nomination-list').add({...movie});
  }

  deleteNominee(movieId: string): Promise<void> {
    return this.firestore.collection('nomination-list').doc(movieId).delete();
  }
}

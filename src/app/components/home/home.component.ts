import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../../firestore/movie-db.service';
import { MovieEntry } from '../../models/movie-entry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nomiationList: MovieEntry[] = [];
  movieTitle: string;
  OMDbURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=53429502';
  movieResult: MovieEntry;

  constructor(private store: MovieDbService) { }

  ngOnInit(): void {
    this.store.getNominationList().subscribe(data => {
      this.nomiationList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as MovieEntry;
      });
    });
  }

  onSubmit(): void {
    const APIRequest = this.OMDbURL + '&t=' + this.movieTitle;
    // Performs Http Get request on the OMDb API
    fetch(APIRequest)
      .then(response => response.json())
      .then(res => this.movieResult = new MovieEntry(null, res.Title, res.Year));
  }

  add(movie: MovieEntry): void {
    this.store.addNominee(movie)
      .then(docRef => {
        movie.id = docRef.id;
        alert(movie.title + ' has been added to the nomination list!');
      })
      .catch(_ => alert('Error. ' + movie.title + ' could not be added to the nomination list!'));
  }

  remove(movie: MovieEntry): void {
    this.store.deleteNominee(movie.id)
      .then(_ => alert(movie.title + ' has been removed!'))
      .catch(_ => alert('Error. ' + movie.title + ' could not be deleted!'));
  }
}

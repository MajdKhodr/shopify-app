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
  OMDbURL = 'https://www.omdbapi.com/?i=tt3896198&apikey=53429502';
  movieResult: MovieEntry;
  displayNominateBtn = true;

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
      .then(res => {
        this.movieResult = new MovieEntry(null, res.Title, res.Year);

        // Checks if the search result has already been nominated
        let exists = false;
        for (const movie of this.nomiationList) {
          if (movie.title === this.movieResult.title) {
            exists = true;
          }
        }
        if (exists) {
          this.displayNominateBtn = false;
        } else {
          this.displayNominateBtn = true;
        }
      });
  }

  add(movie: MovieEntry): void {
    this.store.addNominee(movie)
      .then(docRef => {
        movie.id = docRef.id;
        alert(movie.title + ' has been added to the nomination list!');
      })
      .catch(_ => alert('Error. ' + movie.title + ' could not be added to the nomination list!'));

    if (this.nomiationList.length + 1 === 5) {
      alert('You currently have 5 nominations!');
    }
  }

  remove(movie: MovieEntry): void {
    this.store.deleteNominee(movie.id)
      .then(_ => alert(movie.title + ' has been removed from the nomination list!'))
      .catch(_ => alert('Error. ' + movie.title + ' could not be removed from the nomination list!'));
  }
}

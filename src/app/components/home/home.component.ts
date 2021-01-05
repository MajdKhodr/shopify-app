import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../../firestore/movie-db.service';
import { MovieEntry } from '../../models/movie-entry';
import { HttpClient } from '@angular/common/http';

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

  constructor(private store: MovieDbService,
              private http: HttpClient) { }

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
    // const reponse = this.http.get(APIRequest).subscribe();
    fetch(APIRequest)
      .then(response => response.json())
      .then(res => this.movieResult = new MovieEntry('4', res.Title, res.Year));
  }

  add(movie: MovieEntry): void {
    console.log(movie);
    this.store.addNominee(movie);
    alert(movie.title + ' has been added to the nomination list!');
  }

  remove(movie: MovieEntry): void {
    this.store.deleteNominee(movie.id);
    alert(movie.title + ' has been removed!');
  }
}
